---
layout: post
title: "Arch Linux Post-Installation Steps"
---

1. Enable DHCP:
   ```bash
   systemctl enable dhcpcd systemctl start dhcpcd
   ```
2. Connect to wireless network:
   ```bash
   wifi-menu
   ```
3. Add user:
   ```bash
   useradd -m -g users -s /bin/bash <$USER>
   passwd <$USER>
   ```
4. Configure Sudo with `visudo`:
   ```
   %wheel ALL=(ALL) ALL: ALL
   ```
5. Add User to *wheel* group:
   ```bash
   gpasswd -a <$USER> wheel
   ```
6. Setup NTP:
   ```bash
   systemctl enable ntpd.service
   systemctl start ntpd.service
   ntpd -gq
   hwclock -w
   ```

---
