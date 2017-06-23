---
layout: post
title: "Install Debian Jessie VM in KVM"
tags: [virtualization, kvm, linux, debian]
---

### Create qcow2 disk image
```bash
qemu-img create -f qcow2 /var/lib/libvirt/images/debian.qcow2 16G
```

### Install VM
```bash
virt-install --name "debian" \
  --ram "2048" \
  --vcpus "2" \
  --accelerate \
  --os-type "linux" \
  --os-variant "generic" \
  --network "model=virtio,bridge=virbr0" \
  --disk "bus=virtio,path=/var/lib/libvirt/images/debian.qcow2,format=qcow2" \
  --graphics "none" \
  --console "pty,target_type=serial" \
  --location "http://ftp.halifax.rwth-aachen.de/debian/dists/jessie/main/installer-amd64/" \
  --extra-args "console=ttyS0,115200n8 serial"

```

---
