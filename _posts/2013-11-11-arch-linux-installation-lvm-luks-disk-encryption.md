---
layout: post
title: "Arch Linux Installation: LVM & LUKS Disk Encryption"
tags: [arch-linux,linux,lvm,luks]
---

## First Steps
### Set Keymap
```bash
loadkeys de-latin1-nodeadkeys
```

### Connect to Wireless Network (optional)
```bash
wifi-menu
```

## Partition Layout
### Wipe Disk (optional)
```bash
shred -v -n 1 /dev/sda
```

### GPT Partition Scheme
```bash
sgdisk -og /dev/sda
```

/boot partition (100MiB):
```bash
sgdisk -n 1:2048:+100M -t 1:8300 /dev/sda
```

BIOS boot partition (3MiB):
```bash
sgdisk -n 128:-3M:0 -t 128:ef02 /dev/sda
```

LVM partition:
```bash
sgdisk -n 2:0:0 -t 2:8300 /dev/sda
```

## Encryption
```bash
cryptsetup -c aes-xts-plain -y -s 512 luksFormat /dev/sda2
cryptsetup luksOpen /dev/sda2 lvm
```

## LVM
### Create Logical Volumes
```bash
pvcreate /dev/mapper/lvm
vgcreate main /dev/mapper/lvm
lvcreate -L 25GB -n root main
lvcreate -L 5GB -n swap main
lvcreate -l 100%FREE -n home main
```

### Format Logical Volumes
```bash
mkfs.ext2 -L boot /dev/sda1
mkfs.ext4 -L root /dev/main/root
mkfs.ext4 -L home /dev/main/home
mkswap -L swap /dev/main/swap
```

### Mount Volumes
```bash
mount /dev/main/root /mnt
mkdir /mnt/{boot,home}
mount /dev/sda1 /mnt/boot
mount /dev/main/home /mnt/home
swapon -L swap
```

## Arch Linux Installation
### Basic Installation
```bash
pacstrap /mnt base base-devel
genfstab -p /mnt >> /mnt/etc/fstab
```

chroot:
```bash
arch-chroot /mnt
```

Change root Password:
```bash
passwd
```

Hostname:
```bash
echo <HOSTNAME> > /etc/hostname
```

Locals:
```bash
echo KEYMAP=de-latin1-nodeadkeys > /etc/vconsole.conf
echo en_US.UTF-8 UTF-8 >> /etc/locale.gen locale-gen
```

Timezone:
```bash
ln -s /usr/share/zoneinfo/Europe/Berlin /etc/localtime
```

x86_64 Repositories:
Edit `/etc/pacman.conf`:
```
[multilib] Include = /etc/pacman.d/mirrorlist
```

```bash
pacman -Sy
```

### Additional Packages:
```bash
pacman -S grub-bios vim dialog wpa_supplicant sudo ntp
```

### Build Kernel
Edit `/etc/mkinitcpio.conf`:
```
HOOKS="base udev autodetect block keyboard keymap encrypt lvm2 filesystems"
```

```bash
mkinitcpio -p linux
```

Bootloader (GRUB):
```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

Edit `/boot/grub/grub.cfg`
```
linux vmlinuz-linux cryptdevice=/dev/sda2:main root=/dev/mapper/main-root ro quiet loglevel=3
```

```bash
grub-install /dev/sda
```

Finish Installation & Reboot:
```bash
exit
umount /dev/{sda1,main/home,main/root}
swapoff -L swap
reboot
```

## Post-Installation Steps
See [*here*](/arch-linux-post-installation-steps).

---
