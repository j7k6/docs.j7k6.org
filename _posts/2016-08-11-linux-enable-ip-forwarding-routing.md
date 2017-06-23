---
layout: post
title: "Enable IP Forwarding/Routing in Linux"
tags: [network, routing, linux]
---

```bash
echo "net.ipv4.ip_forward=1" >> /etc/sysctl.conf
sysctl -p
```

---
