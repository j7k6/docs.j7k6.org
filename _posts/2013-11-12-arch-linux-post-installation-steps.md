---
layout: post
title: "Arch Linux Post-Installation Steps"
tags: [arch-linux,linux]
---

## Enable DHCP
```bash
systemctl enable dhcpcd systemctl start dhcpcd
```

## Connect to Wireless Network
```bash
wifi-menu
```

## Add User
```bash
useradd -m -g users -s /bin/bash <$USER>
passwd <$USER>
```

## Sudo
```bash
visudo
```
	%wheel ALL=(ALL) ALL: ALL

```bash
gpasswd -a <$USER> wheel
```

## NTP
```bash
systemctl enable ntpd.service
systemctl start ntpd.service
ntpd -gq
hwclock -w
```

---
