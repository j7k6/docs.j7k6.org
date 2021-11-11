---
layout: post
title: "Kubernetes Cluster on Hetzner Cloud"
fav: 1
---

## Preparations
### hcloud
1. Login to Hetzner Cloud Dashboard and create a new *Project*.
2. In the project, generate new Hetzner Cloud API Token. 
3. Install `hcloud` commandline tool:
   ```bash
   brew install hcloud
   ```
4. Connect `hcloud` to API token:
   ```bash
   hcloud context create <$CLUSTER_NAME>
   ```
5. Generate SSH key:
   ```bash
   ssh-keygen -t rsa -b 4096 -N '' -C '<$CLUSTER_SSH_KEY>' -f ~/.ssh/id_rsa_cluster
   ```
6. Store SSH public key:
   ```bash
   hcloud ssh-key create --name <$CLUSTER_SSH_KEY> --public-key-from-file ~/.ssh/id_rsa_cluster.pub
   ```

### Network
1. Create internal network:
   ```bash
   hcloud network create --name <$CLUSTER_NETWORK> --ip-range 10.0.0.0/16
   ```
2. Add subnet:
   ```bash
   hcloud network add-subnet --network-zone eu-central --type server --ip-range 10.0.0.0/16 <$CLUSTER_NETWORK> 
   ```

### Firewall (Optional)
1. Create firewall:
    ```bash
    hcloud firewall create --name <$CLUSTER_FIREWALL>
    ```
2. Add firewall exception for SSH:
   ```bash
   hcloud firewall add-rule --direction in --protocol tcp --port 22 <$CLUSTER_FIREWALL>
   ```

### Servers
1. Create servers:
   ```
   hcloud server create --image ubuntu-20.04 --name <$MASTER_NODE> --type cpx11 --location nbg1 --start-after-create --ssh-key <$CLUSTER_SSH_KEY>
   hcloud server create --image ubuntu-20.04 --name <$WORKER_NODE_01> --type cpx31 --location nbg1 --start-after-create --ssh-key <$CLUSTER_SSH_KEY>
   hcloud server create --image ubuntu-20.04 --name <$WORKER_NODE_02>--type cpx31 --location fsn1 --start-after-create --ssh-key <$CLUSTER_SSH_KEY>
  ```
2. Attach servers to internal network:
   ```bash
   hcloud server attach-to-network --network <$CLUSTER_NETWORK> --ip 10.0.0.10 <$MASTER_NODE>
   hcloud server attach-to-network --network <$CLUSTER_NETWORK> --ip 10.0.0.11 <$WORKER_NODE_01>
   hcloud server attach-to-network --network <$CLUSTER_NETWORK> --ip 10.0.0.12 <$WORKER_NODE_02>
   ```

### Load Balancer
1. Create Load Balancer:
   ```bash
   hcloud load-balancer create --name <$CLUSTER_LB> --type lb11 --location nbg1
   ```
2. Attach Load Balancer to internal network:
   ```bash
   hcloud load-balancer attach-to-network --network <$CLUSTER_NETWORK> --ip 10.0.0.254 <$CLUSTER_LB>
   ```

## Kubernetes Setup
SSH into each of the nodes to setup the Kubernetes cluster:

```bash
hcloud server ssh <$NODE_NAME>
```

### Server Setup
1. Disable Swap:
   ```bash
   swapoff -a
   sed -i '/swap/d' /etc/fstab
   ```
2. Enable `br_netfilter` kernel module:
   ```
   cat > /etc/modules-load.d/kubernetes.conf << EOF
   br_netfilter
   EOF

   modprobe br_netfilter
   ```
3. Enable routing:
   ```bash
   cat > /etc/sysctl.d/kubernetes.conf << EOF
   net.bridge.bridge-nf-call-iptables = 1
   net.ipv4.ip_forward = 1
   EOF

   sysctl --system
   ```
4. Install dependencies:
   ```bash
   apt update
   apt install -y apt-transport-https ca-certificates curl
   ```
5. Import Kubernetes signing key:
   ```bash
   curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
   ```
6. Add Kubernetes package repo:
   ```bash
   echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" > /etc/apt/sources.list.d/kubernetes.list
   ```
7. Install Kubernetes packages:
   ```
   apt update
   apt install -y containerd kubeadm kubelet kubectl
   apt-mark hold kubelet kubeadm kubectl
   ```
8. Configure `kubelet` service to enable *Hetzner Cloud Provider*:
   ```bash
   cat > /etc/systemd/system/kubelet.service.d/20-hcloud.conf << EOF
   [Service]
   Environment="KUBELET_EXTRA_ARGS=--cloud-provider=external"
   EOF

   systemctl daemon-reload
   systemctl restart kubelet
   ```

### Initialize Kubernetes Cluster
1. On the master node:
   ```bash
   kubeadm init \
     --pod-network-cidr=10.244.0.0/16 \
     --apiserver-advertise-address=0.0.0.0 \
     --apiserver-cert-extra-sans=10.0.0.10
   ```
2. Copy the `kubeadm join...` command from the last command's output and change the external IP to *10.0.0.10*.
3. Run the modified `kubeadm join` command on all worker nodes. 


## Kubernetes Configruation
The cluster configuration can be done locally.

1. Install `kubectl`:
   ```bash
   brew install kubernetes-cli
   ```
2. Copy the contents of `/etc/kubernetes/admin.conf` from the master node to the local `$HOME/.kube/config` file.
3. Check if the connection to the cluster is working:
   ```bash
   kubectl get nodes
   ```

   > **Note**: The nodes' status will be `NotReady` because there is no network controller installed yet.

### Network Controller
Install *Flannel Network Controller*:
```bash
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

> **Note**: When running `kubectl get node` now, the status of all nodes should be `Ready`.

### Hetzner Cloud Controller
1. Create Secrets:
   ```bash
   kubectl -n kube-system create secret generic hcloud \
     --from-literal=token=<$HETZNER_API_TOKEN> \
     --from-literal=network=<$CLUSTER_NETWORK_ID>
   ```

   > **Note**: Run `hcloud network list` to get `<$CLUSTER_NETWORK_ID>`.
2. Install *Hetzner Cloud Controller*:
   ```bash
   kubectl -n kube-system apply -f https://github.com/hetznercloud/hcloud-cloud-controller-manager/releases/download/v1.12.0/ccm-networks.yaml
   ```

### CSI Driver
1. Create Secret:
   ```bash
   kubectl -n kube-system create secret generic hcloud-csi \
     --from-literal=token=<$HETZNER_API_TOKEN>
   ```
2. Install *CSI Driver*:
   ```bash
   kubectl apply -f https://raw.githubusercontent.com/hetznercloud/csi-driver/v1.6.0/deploy/kubernetes/hcloud-csi.yml
   ```

### Ingress Controller
Install *Nginx Ingress Controller*:
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.4/deploy/static/provider/cloud/deploy.yaml
 ```

### Load Balancer
Connect Ingress Controller to Hetzner Load Balancer:
```bash
kubectl -n ingress-nginx annotate services ingress-nginx-controller \
  load-balancer.hetzner.cloud/name="<$CLUSTER_LB>" \
  load-balancer.hetzner.cloud/location="nbg1" \
  load-balancer.hetzner.cloud/use-private-ip="true" \
  load-balancer.hetzner.cloud/uses-proxyprotocol="true" \
  load-balancer.hetzner.cloud/hostname="<$CLUSTER_LB_HOSTNAME>"
```

> **Note**: `<$CLUSTER_LB_HOSTNAME>` needs to be a valid DNS record that points to the Load Balancers' public IP address.

---
1. <https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/>
2. <https://community.hetzner.com/tutorials/howto-k8s-authentication-with-load-balancer>
3. <https://community.hetzner.com/tutorials/install-kubernetes-cluster>
