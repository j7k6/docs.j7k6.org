---
layout: post
title: "Install Ubuntu VM in KVM"
tags: [ubuntu, linux, kvm]
---

## Create qcow2 disk image
```bash
qemu-img create -f qcow2 /var/lib/libvirt/images/ubuntu.qcow2 16G
```

## Install VM
```bash
virt-install --name ubuntu \
  --ram 1024 \
  --disk path=/var/lib/libvirt/images/ubuntu.qcow2,format=qcow2 \
  --vcpus 2 \
  --accelerate \
  --os-type linux \
  --network bridge=br0 \
  --graphics none \
  --console pty,target_type=serial \
  --location 'http://archive.ubuntu.com/ubuntu/dists/trusty/main/installer-amd64/' \
  --extra-args 'console=ttyS0,115200n8 serial'
```

---
1. [https://raymii.org/s/articles/virt-install_introduction_and_copy_paste_distro_install_commands.html](https://raymii.org/s/articles/virt-install_introduction_and_copy_paste_distro_install_commands.html)
