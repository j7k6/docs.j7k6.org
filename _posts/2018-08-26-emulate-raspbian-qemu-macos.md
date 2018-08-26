---
layout: post
title: "Emulate Raspbian with QEMU on macOS"
tags: [qemu,macos,raspbian,raspberry-pi]
---

1. Install *qemu*:
   ```bash
   brew install qemu
   ```
2. Download *qemu-rpi-kernel*:
   ```bash
   wget https://github.com/dhruvvyas90/qemu-rpi-kernel/raw/master/kernel-qemu-4.4.34-jessie
   ```
3. Download *Raspbian*:
   ```bash
   wget http://director.downloads.raspberrypi.org/raspbian/images/raspbian-2018-06-29/2018-06-27-raspbian-stretch.zip
   unzip 2018-06-27-raspbian-stretch.zip
   ```
4. Run emulator:
   ```bash
   sudo qemu-system-arm -kernel ./kernel-qemu-4.4.34-jessie \
     -cpu arm1176 -m 256 \
     -M versatilepb -no-reboot -serial stdio \
     -append "dwc_otg.lpm_enable=0 root=dwc_otg.lpm_enable=0 root=/dev/sda2 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait"" \
     -drive "file= ./2018-06-27-raspbian-stretch.img,index=0,media=disk,format=raw" \
     -net nic -net user,hostfwd=tcp::22222-:22
   ```
5. Enable SSH service on Raspbian:
   ```bash
   systemctl enable --now ssh
   ```
6. SSH into emulated Raspbian from macOS host: 
   ```bash
   ssh -p 22222 pi@localhost
   ```

---
1. <https://gist.github.com/MrAndersonMD/d0d1506a91855d7a022b8cc8d0576b79>
