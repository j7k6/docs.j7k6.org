---
layout: post
title: "Setup Network File Replication with GlusterFS Between 2 Ubuntu Servers"
---

## Prerequirements
Follow those steps on both servers.

1. Install GlusterFS packages:
   ```bash
   add-apt-repository ppa:gluster/glusterfs-5
   apt update
   apt install -y glusterfs-server
   ```
2. Add both servers to `/etc/hosts`:
   ```bash
   cat >> /etc/hosts << EOF
   <$NODE1_IP> node1
   <$NODE2_IP> node2
   EOF
3. Create Mountpoints:
   ```bash
   mkdir -p /data /mnt/glusterfs
   
   cat >> /etc/fstab << EOF
   <$NODE>:/gv0 /mnt/glusterfs glusterfs defaults,_netdev 0 0
   EOF
   ```

## Create GlusterFS volume:
Run these commands on `node1` only:
```bash
gluster peer probe node2
gluster volume create gv0 replica 2 transport tcp node1:/data node2:/data force
gluster volume start gv0

mount /mnt/glusterfs
```
