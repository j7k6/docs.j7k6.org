---
layout: post
title: "Emulate Raspbian (Buster) with QEMU on macOS"
fav: 1
---

1. Install *qemu*:
   ```bash
   brew install qemu
   ```
2. Download *qemu-rpi-kernel*:
   ```bash
   wget https://raw.githubusercontent.com/dhruvvyas90/qemu-rpi-kernel/master/kernel-qemu-4.19.50-buster
   ```
3. Download *versatile-pb.dtb*:
   ```bash
   wget https://raw.githubusercontent.com/dhruvvyas90/qemu-rpi-kernel/master/versatile-pb.dtb
   ```
4. Download *Raspbian*:
   ```bash
   wget http://director.downloads.raspberrypi.org/raspbian_lite/images/raspbian_lite-2019-07-12/2019-07-10-raspbian-buster-lite.zip
   unzip 2019-07-10-raspbian-buster-lite.zip
   ```
5. Run emulator:
   ```bash
   qemu-system-arm -cpu arm1176 -m 256 \
     -kernel kernel-qemu-4.19.50-buster \
     -M versatilepb \
     -dtb versatile-pb.dtb \
     -no-reboot \
     -nographic \
     -append "dwc_otg.lpm_enable=0 root=/dev/sda2 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait" \
     -drive "file=2019-07-10-raspbian-buster-lite.img,index=0,media=disk,format=raw" \
     -net user,hostfwd=tcp::22222-:22 -net nic
   ```
6. Wait for login screen...
7. Enable SSH service on Raspbian:
   ```bash
   systemctl enable --now ssh
   ```
8. SSH into emulated Raspbian from macOS host: 
   ```bash
   ssh -p 22222 pi@localhost
   ```

---
1. <https://docs.j7k6.org/emulate-raspbian-qemu-macos/>
2. <https://gist.github.com/tinjaw/5bc5527ff379e8dd299a0b67e2bc9b62>
