---
layout: post
title: "IPTables Tarpit in Debian/Ubuntu"
---

1. Install Module:
   ```bash
   apt-get install xtables-addons-dkms
   ```
2. Tarpit Source IP:
   ```bash
   iptables -A INPUT -p tcp -s <$SOURCE_IP> -j TARPIT
   ```

---

Remove Source IP from Tarpit:
```bash
iptables -D INPUT -p tcp -s <$SOURCE_IP> -j TARPIT
```

---
1. <https://sysadminblog.net/2013/08/debian-iptables-tarpit/>
