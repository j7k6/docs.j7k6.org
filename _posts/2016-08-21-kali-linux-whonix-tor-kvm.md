---
layout: post
title: "Kali Linux with Whonix Tor Gateway on KVM"
tags: [kali, linux, whonix, tor, kvm, virtualization, network]
---

## Prerequirements

Connect to Host via SSH with tunneled ports:
```bash
ssh $USER@$HOST -L 5910:localhost:5910 -L 5911:localhost:5911
```

## Whonix Gateway

1. Download & Extract *Whonix Gateway*:
    ```bash
    cd /var/lib/libvirt/images
    wget https://www.whonix.org/download/13.0.0.1.1/Whonix-Gateway-13.0.0.1.1.libvirt.xz
    tar -xvf Whonix-Gateway*.libvirt.xz
    ```
2. Create Network:
    ```bash
    virsh define Whonix-Gateway*.xml
    sed -i 's/virbr1/whonixbr1/g' Whonix_network-*.xml
    virsh net-define Whonix_network*.xml
    virsh net-autostart Whonix
    virsh net-start Whonix
    ```
3. Configure & Start Whonix VM:
    ```bash
    virt-xml Whonix-Gateway --remove-device --graphics 
    virt-xml Whonix-Gateway --edit --graphics 'vnc,password=test,port=5910,keymap=de'
    virsh start Whonix-Gateway
    ```
4. Connect VNC to `127.0.0.1:9510` & Finish Whonix Wizard.

## Kali

1. Create Disk Image:
    ```bash
    qemu-img create -f qcow2 /var/lib/libvirt/images/kali.qcow2 32G
    ```
2. Download & Modify Preseed File:
    ```bash
    wget -O preseed.cfg https://raw.githubusercontent.com/offensive-security/kali-linux-preseed/master/kali-linux-light-unattended.preseed
    sed -i 's/\/dev\/sda/\/dev\/vda/g' preseed.cfg
    ```
3. Install Kali Linux:
    ```bash
    virt-install --name kali \
      --ram 2048 \
      --disk "bus=virtio,path=/var/lib/libvirt/images/kali.qcow2,format=qcow2" \
      --vcpus 2 \
      --accelerate \
      --os-type "linux" \
      --noautoconsole \
      --network "bridge=virbr0" \
      --location "http://http.kali.org/kali/dists/sana/main/installer-amd64/" \
      --graphics "vnc,port=5911,password=secret,keymap=de" \
      --initrd-inject "preseed.cfg" \
      --extra-args "keymap=de"
    ```
4. Start Kali:
    ```bash
    virsh start kali
    ```
5. Connect VNC to `127.0.0.1:9511` & Login with `root`:`toor`
6. Install Kali Packages:
    ```bash
    apt-get install kali-linux-full
    ```
7. Change Network to the Whonix Gateway's internal Network:
    ```bash
    virsh detach-interface kali --type bridge
    virsh attach-interface kali --type=bridge --source=whonixbr1
    ```
8. Configure Kali Network:
    - *IP*: `10.152.152.11`
    - *Netmask*: `255.255.192.0`
    - *Gateway*: `10.152.152.10`
    - *Nameserver*: `10.152.152.10`
9. Reboot:
    ```bash
    virsh destroy kali
    virsh start kali
    ```

---
