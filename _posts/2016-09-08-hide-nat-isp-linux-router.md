---
layout: post
title: "Hide NAT from ISP with IPTables on Linux NAT Router"
tags: [nat, iptables, router, linux]
---

### Alternative 1:
```bash
iptables -t mangle -A POSTROUTING -o eth0 -j TTL --ttl-set `cat /proc/sys/net/ipv4/ip_default_ttl`
```

### Alternative 2:
```bash
iptables -t mangle -A POSTROUTING -o eth0 -j TTL --ttl-inc 1
```

---
