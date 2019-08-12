---
layout: post
title: "Disable IPv6 on Debian/Ubuntu"
---

1. Edit `/etc/sysctl.d/20-disable-ipv6.conf`:
   ```
   net.ipv6.conf.all.disable_ipv6 = 1
   net.ipv6.conf.default.disable_ipv6 = 1
   net.ipv6.conf.lo.disable_ipv6 = 1
   net.ipv6.conf.eth0.disable_ipv6 = 1
   ```
2. Activate changes:
   ```bash
   sysctl -p /etc/sysctl.d/20-disable-ipv6.conf
   ```

---
