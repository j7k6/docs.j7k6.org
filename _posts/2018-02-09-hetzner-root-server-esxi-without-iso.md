---
layout: post
title: "Install VMware ESXi to a USB Flash Drive on a Hetzner PX121 Root Server without a Virtual CD/Mounted ISO"
tags: [vmware,esxi,hetzner]
fav: 1
---

I recently had a problem with a new Hetzner Root Server from the *PX121* product line, where I tried to install *VMware ESXi* from a mounted ISO on the Hetzner *Lantronix* KVM console.

Everytime I mounted the ISO, the keyboard stopped working inside of the KVM console session. So I contacted Hetzner Support, which claimed that "*installing from a mounted ISO is not officially supported, so there is nothing they could do about it*", also, "*mounting an ISO on the KVM console has a known bug, where it's disabling all other USB devices on the KVM device*"  :(
...Which basically means that installing ESXi from a mounted ISO is off the table.

My initial plan was to install ESXi to a USB drive I ordered with the server, so I would have a clean system on the USB drive and a full RAID-10 as a datastore, separated from it.
Of cause I could've just `dd` the ESXi ISO on the USB drive and boot from that, but than I would've been forced to install ESXi on the RAID directly, which I wanted to avoid by any means.

So the only option left was this trick: Make the RAID the bootable ESXi installer, boot from it and install ESXi on the USB drive from there.

This is how made the RAID a bootable ESXi installer disk:

1. Boot the Server into *Rescue* mode and login via SSH.
2. Install required packages:
   ```bash
   apt-get install dosfstools mtools syslinux
   ```
3. Download the ESXi ISO:
   ```bash
   curl --progress-bar -o VMware-VMvisor-Installer-6.5.0-4564106.x86_64.iso https://mirror.hetzner.de/bootimages/vmware/VMware-VMvisor-Installer-6.5.0-4564106.x86_64.iso
   ```
4. Create partition Table with `fdisk /dev/sda`:
   ```bash
   d
   o
   n
   p
   2048
   +2G
   w
   ```
5. Reload partition table:
   ```bash
   partprobe && sync
   ```
6. Format partition as *FAT*:
   ```bash
   mkfs.vfat -F 32 /dev/sda1
   ```
7. Install *Syslinux* Bootloader on partition `/dev/sda1`:
   ```bash
   syslinux /dev/sda1
   ```
8. Write *MBR* to RAID disk:
   ```bash
   dd if=/usr/lib/syslinux/mbr/mbr.bin of=/dev/sda
   ```
9. Create mount points:
   ```bash
   mkdir -p /mnt/{iso,raid}
   ```
10. Mount ESXi ISO:
    ```bash
    mount -o loop VMware-VMvisor-Installer-6.5.0-4564106.x86_64.iso /mnt/iso
    ```
11. Mount `/dev/sda1`:
    ```bash
    mount /dev/sda1 /mnt/raid
    ```
12. Copy files from ESXi ISO to RAID disk:
    ```bash
    cp -r /mnt/iso/* /mnt/raid/
    ```
13. Copy *Sylinux* files:
    ```bash
    cp /mnt/raid/isolinux.cfg /mnt/raid/syslinux.cfg
    cp /usr/lib/syslinux/modules/bios/*.c32 /mnt/raid/
    ```
14. Unmount RAID:
    ```bash
    umount /mnt/raid
    sync
    ```
15. `reboot`
16. Boot from RAID drive.
17. Install ESXi to the USB drive.
18. After ESXi is installed successfully, boot into *Rescue* mode again to wipe the RAID drive's partition table (so it can be initialized as datastore in ESXi, like it was supposed to):
    ```bash
    dd if=/dev/zero of=/dev/sda bs=16 count=16 && sync
    ```
19. Reboot
20. Run ESXi from USB drive & have fun!

---
1. [https://raymii.org/s/tutorials/VMWare-ESXi-5-USB-installer.html](https://raymii.org/s/tutorials/VMWare-ESXi-5-USB-installer.html)
