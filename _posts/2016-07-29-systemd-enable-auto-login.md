---
layout: post
title: "Enable Systemd Auto Login"
tags: [systemd, linux]
---

Edit `/etc/systemd/system/getty@tty1.service.d/autologin.conf`:
```
[Service]
ExecStart=
ExecStart=-/sbin/agetty --autologin <$USER> %I 38400
```

---
[https://storma.wordpress.com/2012/11/28/debian-systemd-autologin-without-a-display-manager/](https://storma.wordpress.com/2012/11/28/debian-systemd-autologin-without-a-display-manager/)
