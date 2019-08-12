---
layout: post
title: "Arch Linux Installation: LVM & LUKS Disk Encryption"
---

## First Steps
1. Set Keymap
   ```bash
   loadkeys de-latin1-nodeadkeys
   ```
2. Connect to wireless network (optional)
   ```bash
   wifi-menu
   ```

## Disk Setup
### Partition Layout
1. Wipe disk (optional):
   ```bash
   shred -v -n 1 /dev/sda
   ```
2. Create GPT partition scheme:
   ```bash
   sgdisk -og /dev/sda
   ```
3. /boot partition (100MiB):
   ```bash
   sgdisk -n 1:2048:+100M -t 1:8300 /dev/sda
   ```
4. BIOS boot partition (3MiB):
   ```bash
   sgdisk -n 128:-3M:0 -t 128:ef02 /dev/sda
   ```
5. LVM partition:
   ```bash
   sgdisk -n 2:0:0 -t 2:8300 /dev/sda
   ```

### Encryption
1. Encrypt LVM partition:
   ```bash
   cryptsetup -c aes-xts-plain -y -s 512 luksFormat /dev/sda2
   cryptsetup luksOpen /dev/sda2 lvm
   ```

### LVM
1. Create logical volumes:
   ```bash
   pvcreate /dev/mapper/lvm
   vgcreate main /dev/mapper/lvm
   lvcreate -L 25GB -n root main
   lvcreate -L 5GB -n swap main
   lvcreate -l 100%FREE -n home main
   ```
2. Format logical volumes:
   ```bash
   mkfs.ext2 -L boot /dev/sda1
   mkfs.ext4 -L root /dev/main/root
   mkfs.ext4 -L home /dev/main/home
   mkswap -L swap /dev/main/swap
   ```
3. Mount volumes:
   ```bash
   mount /dev/main/root /mnt
   mkdir /mnt/{boot,home}
   mount /dev/sda1 /mnt/boot
   mount /dev/main/home /mnt/home
   swapon -L swap
   ```

## Arch Linux Installation
### Basic Installation
1. Install base system:
   ```bash
   pacstrap /mnt base base-devel
   genfstab -p /mnt >> /mnt/etc/fstab
   ```
2. Enter chroot:
   ```bash
   arch-chroot /mnt
   ```
3. Change root Password:
   ```bash
   passwd
   ```
4. Set hostname:
   ```bash
   echo <HOSTNAME> > /etc/hostname
   ```
5. Set locales:
   ```bash
   echo KEYMAP=de-latin1-nodeadkeys > /etc/vconsole.conf
   echo en_US.UTF-8 UTF-8 >> /etc/locale.gen locale-gen
   ```
6. Set timezone:
   ```bash
   ln -s /usr/share/zoneinfo/Europe/Berlin /etc/localtime
   ```
7. Enable *x86_64* repositories, edit `/etc/pacman.conf`:
   ```
   [multilib] Include = /etc/pacman.d/mirrorlist
   ```
8. Update packages:
   ```bash
   pacman -Sy
   ```
9. Install additional packages:
   ```bash
   pacman -S grub-bios vim dialog wpa_supplicant sudo ntp
   ```
 
### Kernel
1. Edit `/etc/mkinitcpio.conf`:
   ```
   HOOKS="base udev autodetect block keyboard keymap encrypt lvm2 filesystems"
   ```
2. Build kernel:
   ```bash
   mkinitcpio -p linux
   ```

### Bootloader (GRUB)
1. Configure *GRUB*:
   ```bash
   grub-mkconfig -o /boot/grub/grub.cfg
   ```
2. Edit `/boot/grub/grub.cfg`
   ```
   linux vmlinuz-linux cryptdevice=/dev/sda2:main root=/dev/mapper/main-root ro quiet loglevel=3
   ```
3. Install *GRUB* on disk:
   ```bash
   grub-install /dev/sda
   ```

### Finalize
1. Umount everything:
   ```bash
   exit
   umount /dev/{sda1,main/home,main/root}
   swapoff -L swap
   ```
2. Reboot

## Post-Installation Steps
See [*here*](/arch-linux-post-installation-steps).

---
