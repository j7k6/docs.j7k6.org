---
layout: post
title: "Install Alpine Linux on ZFS with LUKS Full Disk Encryption"
fav: 1
---

> **Note**: Since the *Alpine Linux* installation ISO doesn't support ZFS kernel modules, it's necessary to make a quick standard installation on an USB drive or second HDD first, then boot into the freshly installed Alpine system and do the ZFS based installation from there.

1. Install required packages:
   ```bash
   apk add --update sgdisk cryptsetup e2fsprogs syslinux zfs zfs-$(uname -r | rev | cut -d'-' -f1 | rev)
   ```
2. Prepare GPT partition scheme:
   ```bash
   sgdisk -og /dev/sda
   sgdisk -n 1:2048:+100M -t 1:8300 /dev/sda
   sgdisk --attributes=1:set:2 /dev/sda
   sgdisk -n 2:0:0 -t 2:8300 /dev/sda
   ```
3. `partprobe` isn't working here for some reason, so `reboot` to let the kernel know about the new partition layout.
4. Format boot partition:
   ```bash
   mkfs.ext2 /dev/sda1
   ```
5. Enrcrypt raw system partition with *LUKS*:
   ```bash
   cryptsetup -c aes-xts-plain64 -y -s 512 -h sha256 luksFormat /dev/sda2
   ```
6. Unlock encrypted partition:
   ```bash
   cryptsetup luksOpen /dev/sda2 zfscrypt
   ```
7. Load ZFS kernel module:
   ```bash
   modprobe zfs
   ```
8. Create *zpool*:
   ```bash
   zpool create -f -m none -R /mnt -O compression=lz4 zroot /dev/mapper/zfscrypt
   ```
9. Create ZFS root dataset:
   ```bash
   zfs create -o mountpoint=none -o canmount=off zroot/ROOT
   zfs create -o mountpoint=/ zroot/ROOT/alpine
   ```
10. Mount boot partition into the ZFS mountpoint:
    ```bash
    mkdir -p /mnt/boot
    mount /dev/sda1 /mnt/boot
    ```
11. Install *Alpine Linux* into ZFS mountpoint:
    ```bash
    setup-disk -m sys /mnt/
    ```
12. Prepare *initramfs*:
    ```bash
    echo "crypt /dev/sda2 none  luks" > /mnt/etc/crypttab
    sed -i "/zfs/d" /mnt/etc/fstab
    sed -i "s/zfs/cryptsetup zfs/" /mnt/etc/mkinitfs/mkinitfs.conf
    ```
13. Build *initramfs*:
    ```bash
    mkinitfs -c /mnt/etc/mkinitfs/mkinitfs.conf -b /mnt/ $(ls /mnt/lib/modules/)
    ```
14. Update *syslinux* bootloader:
    ```bash
    sed -i "s|rootfstype=zfs|cryptroot=/dev/sda2 cryptdm=crypt rootfstype=zfs|" /mnt/etc/update-extlinux.conf
    chroot /mnt/ /sbin/update-extlinux 2>/dev/null
    ```
15. Write MBR to disk:
    ```bash
    dd bs=440 count=1 conv=notrunc if=/mnt/usr/share/syslinux/gptmbr.bin of=/dev/sda
    ```
16. Unmount everything:
    ```bash
    umount /mnt/boot
    zfs unmount -a
    cryptsetup luksClose zfscrypt
    ```
17. `reboot`

---
1. <https://wiki.alpinelinux.org/wiki/Setting_up_ZFS_on_LUKS>
