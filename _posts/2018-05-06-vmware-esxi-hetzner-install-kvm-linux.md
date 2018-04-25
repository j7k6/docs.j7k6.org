---
layout: post
title: "Install VMware ESXi on a Hetzner Root Server in Rescue System with KVM Virtualization"
tags: [hetzner,vmware,esxi,kvm]
---

[Another](/hetzner-root-server-esxi-without-iso/) method to install *VMware ESXi* on a Hetzner root server without having access to the terrible *LARA console* (Remote KVM) is to use **KVM** virtualization in the Hetzner Linux rescue  system.

VNC will be used to install ESXi, so connect to the server with the SSH local port forwarding option `-L 5901:localhost:5901`. This will make the VNC port available on your local machine.

1. First download the *ESXi* ISO from Hetzner's mirror server:
   ```bash
   wget https://mirror.hetzner.de/bootimages/vmware/VMware-VMvisor-Installer-6.5.0-4564106.x86_64.iso
   ```
2. Then invoke a VM with the servers pyhsical harddrive as virtual disk and the ESXi ISO as CDRom.
   ```bash
   kvm -machine pc-i440fx-2.1 \
     -cpu host \
     -smp cpus=2 \
     -m 4096 \
     -hda /dev/sda\
     -cdrom VMware-VMvisor-Installer-6.5.0-4564106.x86_64.iso \
     -vnc :1
    ```
3. Now connect your local VNC client to `vnc://127.0.0.1:5901` and complete the ESXi installation process.
   ![vmware-esxi-hetzner-install-kvm-linux](/files/vmware-esxi-hetzner-install-kvm-linux.png)
4. After the ESXi VM rebooted, reset the system configuration and reboot, but be sure to stop the VM before it can boot up again(!). The server can now be restarted and boot right into the freshly installed ESXi.

> **Note**: ESXi is now fully resetted, which means that the root password is now empty! So after restarting the server, login to the ESXi webinterface with `root` as user and an empty password and set a new root password immediately! 

---
1. [https://virtuallyfun.com/wordpress/2017/03/07/running-vmware-esxi-6-5-linuxkvm/](https://virtuallyfun.com/wordpress/2017/03/07/running-vmware-esxi-6-5-linuxkvm/)
