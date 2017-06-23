---
layout: post
title: "Reset Windows Password with chntpw on Linux"
tags: [windows, password, linux]
---

1. Install required Packages:
```bash
apt-get install chntpw ntfs-3g
```
2. Mount Windows Partition:
```bash
mount -t ntfs /dev/sda2 /mnt
```
3. Change Directory:
```bash
cd /mnt/WINDOWS/system32/config
```
4. List available Users:
```bash
chntpw -l SAM
```
5. Select User:
```bash
chntpw -u $USERNAME SAM 
```
6. Select an Option from the Menu.
7. Unmount Windows Partition & Reboot.

---
