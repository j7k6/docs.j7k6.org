---
layout: post
title: "Mount QCOW2 Disk Image on Debian/Ubuntu Linux"
---

1. Install `qemu-utils`:
   ```bash
   apt install qemu-utils
   ```
2. Load `nbd` kernel module:
   ```bash
   modprobe nbd max_part=8
   ```
3. Mount QCOW2 disk image as NBD device:
   ```bash
   qemu-nbd -c /dev/nbd0 --read-only <$PATH_TO_QCOW2>
   ```
4. List partitions on NBD device (optional):
   ```bash
   fdisk -l /dev/nbd0
   ```
5. Mount NBD partition's filesystem:
   ```bash
   mount -o ro /dev/nbd0p1 /mnt
   ```

---
