---
layout: post
title: "Chroot into Raspberry Pi ARMv7 Image with Qemu on Linux"
---

1. Install dependecies:
   ```bash
   apt-get install qemu qemu-user-static binfmt-support
   ```
2. Download & extract the *Raspbian* disk image:
   ```bash
   wget https://downloads.raspberrypi.org/raspbian_latest
   unzip raspbian_latest
```
3. Extend *Raspbian* disk image by 1GB:
   ```bash
   dd if=/dev/zero bs=1M count=1024 >> 2016-05-27-raspbian-jessie.img
   ```
4. Set-up disk image as loop device:
   ```bash
   losetup /dev/loop0 2016-05-27-raspbian-jessie.img
   ```
5. Check file system:
   ```bash
   e2fsck -f /dev/loop0p2
   ```
6. Expand partition:
   ```bash
   resize2fs /dev/loop0p2
   ```
7. Mount partitions:
   ```bash
   mount -o rw /dev/loop0p2  /mnt
   mount -o rw /dev/loop0p1 /mnt/boot
   ```
8. Mount binds:
   ```bash
   mount --bind /dev /mnt/dev/
   mount --bind /sys /mnt/sys/
   mount --bind /proc /mnt/proc/
   mount --bind /dev/pts /mnt/dev/pts
   ```
9. `ld.so.preload` fix:
   ```bash
   sed -i 's/^/#/g' /mnt/etc/ld.so.preload
   ```
10. Copy `qemu` binary:
    ```bash
    cp /usr/bin/qemu-arm-static /mnt/usr/bin/
    ```
11. Chroot into *Raspbian*:
    ```bash
    chroot /mnt /bin/bash
    ```
12. Do *stuff* inside the chroot and `exit`.
13. Revert the `ld.so.preload` fix:
    ```bash
    sed -i 's/^#//g' /mnt/etc/ld.so.preload
    ```
14. Unmount everything
    ```bash
    umount /mnt/{dev/pts,dev,sys,proc,boot,}
    ```
15. Unmount loop device
    ```bash
    losetup -d /dev/loop0
    ```

---
1. <https://wiki.debian.org/RaspberryPi/qemu-user-static>
