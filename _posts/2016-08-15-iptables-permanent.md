---
layout: post
title: "Save IPTables Rules Permanent"
---

1. Save `iptables` rules:
```bash
iptables-save > /etc/iptables.conf
```
2. Edit `/etc/network/interfaces`:
```
...
iface eth0 inet dhcp
  pre-up iptables-restore < /etc/iptables.conf
...
```

---
