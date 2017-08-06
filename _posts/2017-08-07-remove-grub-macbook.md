---
layout: post
title: "Remove GRUB Bootloader on MacBook"
tags: [macos, grub, linux, bootloader]
---

```bash
mkdir mnt
sudo mount -t msdos /dev/disk0s1 mnt
cd mnt/EFI/
sudo rm -rf <DISTRO>
sudo reboot
```

---
1. [https://www.techonia.com/1063/remove-grub-bootloader-macbook-pro-air-imac](https://www.techonia.com/1063/remove-grub-bootloader-macbook-pro-air-imac)
