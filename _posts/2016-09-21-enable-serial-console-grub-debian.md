---
layout: post
title: "Enable Serial Console in GRUB on Debian"
tags: [debian, linux, grub, console]
---

1. Edit `/etc/default/grub`:
```
GRUB_CMDLINE_LINUX="console=tty0 console=ttyS0,115200n8"
```
2. Update boot loader:
```bash
update-grub
reboot
```

---
