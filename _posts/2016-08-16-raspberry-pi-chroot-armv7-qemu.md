---
layout: post
title: "Chroot into Raspberry Pi ARMv7 Image with Qemu"
tags: [raspberry-pi, chroot, linux, qemu]
---

### Install Dependecies
```bash
apt-get install qemu qemu-user-static binfmt-support
```

### Download & Extract Raspbian Image
```bash
wget https://downloads.raspberrypi.org/raspbian_latest
unzip raspbian_latest
```

### Extend Raspbian Image by 1GB
```bash
dd if=/dev/zero bs=1M count=1024 >> 2016-05-27-raspbian-jessie.img
```

### Set-up Image as Loop Device
```bash
losetup /dev/loop0 2016-05-27-raspbian-jessie.img
```

### Check File System
```bash
e2fsck -f /dev/loop0p2
```

### Expand Partition
```bash
resize2fs /dev/loop0p2
```

### Mount Partitions
```bash
mount -o rw /dev/loop0p2  /mnt
mount -o rw /dev/loop0p1 /mnt/boot
```

### Mount Binds
```bash
mount --bind /dev /mnt/dev/
mount --bind /sys /mnt/sys/
mount --bind /proc /mnt/proc/
mount --bind /dev/pts /mnt/dev/pts
```

### ld.so.preload Fix
```bash
sed -i 's/^/#/g' /mnt/etc/ld.so.preload
```

### Copy Qemu Binary
```bash
cp /usr/bin/qemu-arm-static /mnt/usr/bin/
```

### Chroot into Raspbian
```bash
chroot /mnt /bin/bash
	# do stuff...
	exit
```

### Revert ld.so.preload Fix
```bash
sed -i 's/^#//g' /mnt/etc/ld.so.preload
```

### Unmount Everything
```bash
umount /mnt/{dev/pts,dev,sys,proc,boot,}
```

### Unmount Loop Device
```bash
losetup -d /dev/loop0
```

---
1. [https://wiki.debian.org/RaspberryPi/qemu-user-static](https://wiki.debian.org/RaspberryPi/qemu-user-static)
