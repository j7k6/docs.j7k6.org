---
layout: post
title: "Install bcm43xx WLAN Driver in Debian"
tags: [debian, wlan, driver, linux]
---

```bash
echo "deb http://httpredir.debian.org/debian/ jessie main contrib non-free" >> /etc/apt/sources.list

apt-get update
apt-get install linux-image-$(uname -r|sed 's,[^-]*-[^-]*-,,') linux-headers-$(uname -r|sed 's,[^-]*-[^-]*-,,') broadcom-sta-dkms
modprobe -r b44 b43 b43legacy ssb brcmsmac bcma
modprobe wl
[reboot]
```

---
1. [https://wiki.debian.org/wl](https://wiki.debian.org/wl)
