---
layout: post
title: "Hide NAT from ISP with IPTables on Linux NAT Router"
---

## Option 1
```bash
iptables -t mangle -A POSTROUTING -o eth0 -j TTL --ttl-set `cat /proc/sys/net/ipv4/ip_default_ttl`
```

## Option 2
```bash
iptables -t mangle -A POSTROUTING -o eth0 -j TTL --ttl-inc 1
```

---
