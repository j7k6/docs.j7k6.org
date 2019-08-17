---
layout: post
title: "Kali Linux: Full Disk Encryption with Plausible Deniability and Detached LUKS Header on Encrypted USB Boot Drive"
fav: 1
---

## First Steps
1. Boot *Kali Linux* live system from [install disk](https://www.kali.org/downloads/).
2. Run *Terminal* app.
3. Securely erase data on system disk and USB drive (optional, but *recommended*!):
   ```bash
   shred /dev/sda
   shred /dev/sdb
   ```

## USB Boot Drive
### Partition Layout
1. Create *GPT* partition layout:
   ```bash
   sgdisk -og /dev/sdb
   ```
2. Create *EFI* partition:
   ```bash
   sgdisk -n 1:2048:+256M -t 1:ef00 /dev/sdb
   ```
3. Create encrypted boot partition:
   ```bash
   sgdisk -n 2:0:0 -t 2:8300 /dev/sdb
   ```

### EFI Boot Partition
1. Format *EFI* partition:
   ```bash
   mkfs.vfat /dev/sdb1
   ```

### Encrypted Boot Partition
1. Encrypt boot partition:
   ```
   cryptsetup luksFormat -y -h sha512 -s 512 -c aes-xts-plain64 --type luks1 /dev/sdb2
   ```
2. Open encrypted boot partition:
   ```bash
   cryptsetup luksOpen /dev/sdb2 crypt_boot
   ```
3. Format boot partition:
   ```bash
   mkfs.ext2 /dev/mapper/crypt_boot
   ```
4. Mount boot partition:
   ```bash
   mount /dev/mapper/crypt_boot /mnt
   ```

## System Drive
### Encryption
1. Create empty header file:
   ```bash
   truncate -s 4M /mnt/root_header
   ```
2. Generate encryption key for the system drive:
   ```bash
   dd if=/dev/urandom of=/mnt/root_key bs=64 count=8
   ```
3. Encrypt system drive with detached header and keyfile:
   ```bash
   cryptsetup luksFormat -y -h sha512 -s 512 -c aes-xts-plain64 --header /mnt/root_header --offset=0 --align-payload 0 --type luks2 /dev/sda /mnt/root_key
   ```
4. Open encrypted system drive:
   ```bash
   cryptsetup luksOpen --header /mnt/root_header --key-file /mnt/root_key /dev/sda crypt_root
   ```

### LVM
1. Create *physical volume*:
   ```bash
   pvcreate /dev/mapper/crypt_root
   ```
2. Create *volume group*:
   ```bash
   vgcreate kali /dev/mapper/crypt_root
   ```
3. Create *swap* partition:
   ```bash
   lvcreate -n swap -L 2G kali
   ```
4. Create *root* partition:
   ```bash
   lvcreate -n root -l 100%FREE kali
   ```

### Filesystem Setup
1. Format *swap* partition:
   ```bash
   mkswap /dev/kali/swap
   ```
2. Format *root* partition:
   ```bash
   mkfs.ext4 -m 0 /dev/kali/root
   ```


## Kali Linux Installation
### Mounts
1. Unmount *boot* partition:
   ```bash
   umount /mnt
   ```
2. Mount *root* partition:
   ```bash
   mount /dev/kali/root /mnt
   ```
3. Create mountpoint for *boot* partition:
   ```bash
   mkdir -p /mnt/boot
   ```
4. Mount *boot* partition:
   ```bash
   mount /dev/mapper/crypt_boot /mnt/boot/
   ```
5. Create mountpoint for *EFI* partition:
   ```bash
   mkdir -p /mnt/boot/efi
   ```
6. Mount *EFI* partition:
   ```bash
   mount /dev/sdb1 /mnt/boot/efi
   ```
7. Enable *swap*:
   ```bash
   swapon /dev/kali/swap
   ```

### Base Install
1. Install `debootstrap`:
   ```bash
   apt update
   apt install -y debootstrap
   ```
2. Bootstrap *Kali* base system:
   ```bash
   debootstrap --include=gpg,grub2,grub-efi-amd64,cryptsetup,lvm2,initramfs-tools,linux-image-amd64 kali-rolling /mnt
   ```
3. Copy system config files:
   ```bash
   cp /etc/apt/sources.list /mnt/etc/apt/
   cp /etc/{passwd,group,shadow,hostname,resolv.conf} /mnt/etc/
   ```
4. Create `/mnt/etc/fstab`:
   ```
   /dev/kali/root / ext4  defaults  0 1
   /dev/kali/swap none  swap  defaults  0 0
   ```

### Boot Unlock Setup
1. Create `/mnt/etc/crypttab`:
   ```
   crypt_root /dev/sda /boot/root_key luks,discard,noearly,header=/boot/root_header,keyscript=/lib/cryptsetup/scripts/getinitramfskey
   ```
2. Create `/mnt/lib/cryptsetup/scripts/getinitramfskey`:
   ```
   if [[ -f "${1}" ]]; then
     cat "${1}"
   else
     PASS="$(/lib/cryptsetup/askpass 'unlock: ')"
     echo "${PASS}"
   fi
   ```
3. ...and make it executable:
   ```bash
   chmod +x /mnt/lib/cryptsetup/scripts/getinitramfskey
   ```
4. Create `/mnt/etc/initramfs-tools/hooks/loadinitramfskey`:
   ```
   . ${CONFDIR}/initramfs.conf
   . /usr/share/initramfs-tools/hook-functions
   
   mkdir -p ${DESTDIR}/boot/
   cp /boot/root_* ${DESTDIR}/boot/
   ```
5. ...and make it executable:
   ```bash
   chmod +x /mnt/etc/initramfs-tools/hooks/loadinitramfskey
   ```
6. Edit `/mnt/etc/default/grub`:
   ```
   GRUB_CMDLINE_LINUX="cryptdevice=/dev/sda:crypt_root"
   GRUB_ENABLE_CRYPTODISK=y
   ```

### Bootloader
1. Create bind-mounts:
   ```bash
   for d in dev dev/pts sys proc run/udev; do mkdir -p /mnt/$d; mount -o bind /$d /mnt/$d; done
   ```
2. Enter *chroot*:
   ```bash
   chroot /mnt
   ```
3. Install *GRUB* on USB drive:
   ```
   grub-install --target=x86_64-efi --uefi-secure-boot --efi-directory=/boot/efi --bootloader=kali --boot-directory=/boot/efi/EFI/kali --recheck /dev/sdb
   ```
4. Generate *GRUB* config:
   ```bash
   grub-mkconfig -o /boot/efi/EFI/kali/grub/grub.cfg
   ```
5. Create ramdisk (*initramfs*):
   ```bash
   update-initramfs -c -k all
   ```
6. Exit *chroot*:
   ```bash
   exit
   ```

### Finalize
1. Unmount *everything*:
   ```bash
   for d in dev/pts dev sys proc run/udev boot/efi boot; umount /mnt/$d; done
   umount /mnt
   swapoff /dev/kali/swap
   lvchange -an
   vgchange -an
   cryptsetup luksClose crypt_boot
   cryptsetup luksClose crypt_root
   ```
2. Reboot.

---
1. <http://and1equals1.blogspot.com/2009/10/encrypting-your-hdd-with-plausible.html>
2. <https://www.coolgeeks101.com/howto/infrastructure/full-disk-encryption-ubuntu-usb-detached-luks-header/>
3. <https://outflux.net/blog/archives/2017/08/30/grub-and-luks/>
4. <https://www.schmidp.com/2014/12/12/full-disk-encryption-with-grub-2-+-luks-+-lvm-+-swraid-on-debian/>
5. <https://cryptsetup-team.pages.debian.net/cryptsetup/encrypted-boot.html>
6. <https://unixsheikh.com/tutorials/real-full-disk-encryption-using-grub-on-debian-linux-for-bios.html>
