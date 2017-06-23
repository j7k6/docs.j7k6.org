---
layout: post
title: "Reset Linux Root Password with GRUB"
tags: [linux, password, grub]
---

1. Press `e` in GRUB boot menu.
2. Append `init=/bin/bash` to the kernel line.
3. Press `b` to boot.
4. Mount filesystem as writeable: `mount -o remount,rw /`
5. Set new root password with `passwd`.
6. Reboot

---
1. [https://wiki.archlinux.org/index.php/Reset_root_password](https://wiki.archlinux.org/index.php/Reset_root_password)
