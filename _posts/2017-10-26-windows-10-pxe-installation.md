---
layout: post
title: "PXE Boot & Install Windows 10 from a Samba Share"
tags: [windows,pxe,samba,linux]
fav: 1
---

## Prerequirements
This guide is based on [this setup](/raspberry-pi-pxe-server/). The steps for configuring `dnsmasq` and `pxelinux` have to be completed to make booting the Windows Installer over the network work.
There also needs to be a **Windows 10 x64** ISO available on the Debian box.

1. Install packages:
   ```bash
   apt-get update
   apt-get install -y samba genisoimage wimtools cabextract
   ```
2. Link `mkisofs`:
   ```bash
   ln -s /usr/bin/genisoimage /usr/bin/mkisofs
   ```
3. Create direcories:
   ```bash
   mkdir -p /mnt/waik
   mkdir -p /var/lib/tftpboot/windows
   ```

## Prepare *Windows PE* ISO

1. Download the *[Windows Automated Installation Kit](https://www.microsoft.com/en-us/download/details.aspx?id=5753)* (**WAIK**) ISO:
   ```bash
   wget https://download.microsoft.com/download/8/E/9/8E9BBC64-E6F8-457C-9B8D-F6C9A16E6D6A/KB3AIK_EN.iso
   ```
2. Mount *KB3AIK_EN.iso*:
   ```bash
   mount KB3AIK_EN.iso /mnt/waik
   ```
3. Generate *Windows PE* bootable ISO:
   ```bash
   mkwinpeimg --iso --arch=amd64 --waik-dir=/mnt/waik /var/lib/tftpboot/winpe.iso
   ```
4. Unmount *KB3AIK_EN.iso*:
   ```bash
   umount /mnt/waik
   ```

## Samba
1. Edit `/etc/samba/smb.conf`:
   ```
   [global]
     workgroup = WORKGROUP
     map to guest = bad user
     usershare allow guests = yes

   [windows]
     browsable = true
     read only = yes
     guest ok = yes
     path = /var/lib/tftpboot/windows
   ```
2. Restart `samba` service:
   ```bash
   systemctl restart smbd
   ```
3. Mount *Windows 10 ISO* onto samba share:
   ```bash
   mount <$WINDOWS_ISO> /var/lib/tftpboot/windows
   ```

## pxelinux
1. Link `memdisk`:
   ```bash
   ln -s /usr/lib/syslinux/memdisk /var/lib/tftpboot/
   ```
2. Edit `/var/lib/tftpboot/pxelinux.cfg/default`:
   ```
   LABEL windows10
   MENU LABEL Windows 10
   KERNEL /memdisk
   INITRD /winpe.iso
   APPEND iso raw
   ```

## Windows Installation
1. Boot with PXE
2. Wait for DHCP assigned IP (check with `ipconfig`)
3. Mount Samba share:
   ```sh
   net use Z: \\192.168.1.10\windows
   ```
4. Run `z:\setup.exe`
5. Install Windows.

---
1. [http://it-joe.com/windows/pxe_install](http://it-joe.com/windows/pxe_install)
2. [http://www.webupd8.org/2013/07/how-to-create-bootable-windows-pe-iso.html](http://www.webupd8.org/2013/07/how-to-create-bootable-windows-pe-iso.html)
3. [https://www.savelono.com/linux/how-to-install-windows-7-over-a-network-using-linux-pxe-dnsmasq-and-samba.html](https://www.savelono.com/linux/how-to-install-windows-7-over-a-network-using-linux-pxe-dnsmasq-and-samba.html)
4. [https://github.com/pimterry/rpi-pxe-server](https://github.com/pimterry/rpi-pxe-server)
