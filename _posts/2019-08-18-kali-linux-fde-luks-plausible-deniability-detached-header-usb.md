---
layout: post
title: "Kali Linux: Full Disk Encryption with Plausible Deniability and Detached LUKS Header on Encrypted USB Boot Drive"
fav: 1
---

> **Full Disk Encryption** of a Kali Linux installation is nice, but Full Disk Encryption with [**Plausible Deniability**](https://en.wikipedia.org/wiki/Plausible_deniability) is nicer.
>
> – Me.

## First Steps
1. Enable **UEFI boot**.
2. Boot *Kali Linux* [*Installer*](https://www.kali.org/downloads/).
3. After *keyboard layout* setup, switch to the *virtual terminal* by pressing `alt`+`F2`:
   ![kali-fde-01.png](/files/kali-fde-01.png)
4. Securely erase all existing data on the system disk and USB drive (optional, but *recommended*!):
   ```bash
   dd if=/dev/urandom of=/dev/sda bs=16M
   dd if=/dev/urandom of=/dev/sdb bs=16M
   ```
5. Install required packages:
   ```bash
   anna-install crypto-dm-modules cryptsetup-udeb lvm2-udeb parted-udeb
   ```
6. Load required kernel module:
   ```bash
   depmod
   modprobe dm_crypt
   ```
7. Unmount existing USB drive mounts:
   ```bash
   umount /media
   ```

## USB Boot Drive
### Partition Layout
1. Create *GPT* partition layout:
   ```bash
   parted /dev/sdb -s mklabel gpt
   ```
2. Create *EFI* partition:
   ```bash
   parted /dev/sdb -s mkpart primary fat32 1MiB 257MiB
   parted /dev/sdb -s set 1 esp on
   ```
3. Create encrypted boot partition:
   ```bash
   parted /dev/sdb -s mkpart primary ext2 257MiB 513MiB
   ```

### EFI Boot Partition
1. Format *EFI* partition:
   ```bash
   mkfs.fat -F 32 /dev/sdb1
   ```

### Encrypted Boot Partition
1. Encrypt boot partition:
   ```
   cryptsetup luksFormat -y -h sha512 -s 512 --type luks1 /dev/sdb2
   ```
2. Open encrypted boot partition:
   ```bash
   cryptsetup luksOpen /dev/sdb2 crypt_boot
   ```
3. Format boot partition:
   ```bash
   mkfs.ext2 /dev/mapper/crypt_boot
   ```

## System Drive
### Encryption
1. Create empty header file:
   ```bash
   dd if=/dev/zero of=/tmp/root_header bs=4M count=1
   ```
2. Generate encryption key for the system drive:
   ```bash
   dd if=/dev/urandom of=/tmp/root_key bs=512 count=1
   ```
3. Encrypt system drive with detached header and keyfile:
   ```bash
   cryptsetup luksFormat -y -h sha512 -s 512 --header /tmp/root_header -o 0 --type luks2 /dev/sda /tmp/root_key
   ```
4. Open encrypted system drive:
   ```bash
   cryptsetup luksOpen --header /tmp/root_header -d /tmp/root_key /dev/sda crypt_root
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
   mkfs.ext4 /dev/kali/root
   ```

## Kali Linux Installation
### Partition Disks
> Switch back to the main installer screen by pressing `alt`+`F5`.

Follow all the installation steps until the *Partition disks* screen appears. Choose *Manual* and assign all the mount points to the previously created partitions as shown here:
    
![kali-fde-02.png](/files/kali-fde-02.png)

### Install System
Installing the system to disk takes some time:
![kali-fde-03.png](/files/kali-fde-03.png)

Wait until the next screen (*Network Mirror*) arrives. **Don't click *Continue* yet!**

## Doin' Magic
The bootloader will be written to the USB drive. The boot partition itself is encrypted, so it has to be unlocked with the previously set boot partition's *LUKS* passphrase first. This is rather complicated and cannot be accomplished with the default *Kali* installer, so it has to be done manually:

> Switch back to the *virtual terminal* screen by pressing `alt`+`F2`.

### Bind Mounts
1. Create mountpoint for `/run/udev`:
   ```bash
   mkdir -p /target/run/udev
   ```
2. *Bind Mount*:
   ```bash
   mount --bind /run/udev /target/run/udev
   mount --bind /sys /target/sys
   mount --bind /dev/pts /target/dev/pts
   ```

### GRUB
1. Install *GRUB* in chroot:
   ```bash
   chroot /target apt install -y grub-efi-amd64
   ```
2. Add this lines to `/target/etc/default/grub`:
   ```
   GRUB_CMDLINE_LINUX="cryptdevice=/dev/sda:crypt_root"
   GRUB_ENABLE_CRYPTODISK=y
   GRUB_DISABLE_LINUX_UUID=true
   ```
3. Write bootloader to USB drive:
   ```bash
   chroot /target grub-install --target=x86_64-efi --uefi-secure-boot --efi-directory=/boot/efi --bootloader=kali --boot-directory=/boot/efi/EFI/kali --recheck /dev/sdb
   ```
4. Generate *GRUB* config:
   ```bash
   chroot /target grub-mkconfig -o /boot/efi/EFI/kali/grub/grub.cfg
   ```

### Ramdisk (initramfs)
1. Move LUKS header and key files:
   ```bash
   mv /tmp/root_header /tmp/root_key /target/boot/
   ```
2. Edit `/target/etc/crypttab`:
   ```
   crypt_root /dev/sda /boot/root_key luks,discard,noearly,header=/boot/root_header,keyscript=/lib/cryptsetup/scripts/unlock
   ```
3. Create `/target/lib/cryptsetup/scripts/unlock`:
   ```
   cat "$1"
   ```
4. ...and make it executable:
   ```bash
   chmod +x /target/lib/cryptsetup/scripts/unlock
   ```
5. Create `/target/etc/initramfs-tools/hooks/luks`:
   ```
   mkdir -p $DESTDIR/boot/
   cp /boot/root_header /boot/root_key $DESTDIR/boot/
   ```
6. ...and make it executable:
   ```bash
   chmod +x /target/etc/initramfs-tools/hooks/luks
   ```
7. Create ramdisk (*initramfs*):
   ```bash
   chroot /target update-initramfs -c -k all
   ```

### Workarounds
1. The *Kali* installer would mess te previous steps up when installing the *GRUB* bootloader, so the  boot partition(s) need to be unmounted before continuing the installation process:
   ```bash
   umount /target/boot/efi
   umount /target/boot
   ```
2. Comment out (or delete) the */boot* and */boot/efi* partition lines in `/target/etc/fstab`! If active, this will prevent the system from booting succesfully because it will try to mount the encrypted *boot* partition, which will fail.

## Finalize
> Switch back to the main installer screen by pressing `alt`+`F5`.

The *GRUB* installation step will fail, of course (the boot partitions are unmounted):
![kali-fde-04.png](/files/kali-fde-04.png)

Ignore that and ***Continue without boot loader*** to finish the installation:
![kali-fde-05.png](/files/kali-fde-05.png)

This is what unlocking the enrypted boot partition will look like:
![kali-fde-06.png](/files/kali-fde-06.png)

## Kernel Updates
Every time a new kernel is going to be installed, the encrypted boot partition needs to be decrypted and mounted first:

```bash
cryptsetup luksOpen /dev/sdb2 crypt_boot
mount /dev/mapper/crypt_boot /boot
mount /dev/sdb1 /boot/efi
```

---
1. <http://and1equals1.blogspot.com/2009/10/encrypting-your-hdd-with-plausible.html>
2. <https://www.coolgeeks101.com/howto/infrastructure/full-disk-encryption-ubuntu-usb-detached-luks-header/>
3. <https://outflux.net/blog/archives/2017/08/30/grub-and-luks/>
4. <https://www.schmidp.com/2014/12/12/full-disk-encryption-with-grub-2-+-luks-+-lvm-+-swraid-on-debian/>
5. <https://cryptsetup-team.pages.debian.net/cryptsetup/encrypted-boot.html>
6. <https://unixsheikh.com/tutorials/real-full-disk-encryption-using-grub-on-debian-linux-for-bios.html>
