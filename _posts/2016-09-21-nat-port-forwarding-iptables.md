---
layout: post
title: "NAT Port Forwarding with Iptables"
tags: [nat, network, iptables, linux]
---

```bash
iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j DNAT --to <$LOCAL_IP>:80
iptables -A INPUT -p tcp -m state --state NEW --dport 80 -i eth0 -j ACCEPT
```

---
