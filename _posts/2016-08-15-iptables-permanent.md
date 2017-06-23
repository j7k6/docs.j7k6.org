---
layout: post
title: "Save IPTables Rules Permanent"
tags: [linux, iptables]
---

```bash
iptables-save > /etc/iptables.conf
```

`/etc/network/interfaces`
```
...
iface eth0 inet dhcp
  pre-up iptables-restore < /etc/iptables.conf
...
```

---
