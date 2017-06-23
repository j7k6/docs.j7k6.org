---
layout: post
title: "Allow Mobile Shell (mosh) in IPTables"
tags: [mosh, iptables, linux]
---

```bash
iptables -A INPUT -p udp --dport 60000:61000 -j ACCEPT
```

---
