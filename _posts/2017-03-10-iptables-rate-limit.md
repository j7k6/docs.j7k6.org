---
layout: post
title: "IPTables Rate Limit"
tags: [iptables]
---

```bash
iptables -N LOGGING
iptables -A LOGGING -m limit --limit 2/min -j LOG --log-prefix "IPTables-Dropped: " --log-level 4

iptables -A INPUT -p tcp --dport 80 -m state --state NEW -m recent --set
iptables -A INPUT -p tcp --dport 80 -m state --state NEW -m recent --update --seconds 60 --hitcount 20 -j LOGGING

iptables -A LOGGING -j DROP
```

---
