---
layout: post
title: "Port Knocking with IPTables"
---

```bash
iptables -A INPUT -p tcp --dport <$PORT1> -m recent --set --rsource --name KNOCK1
iptables -A INPUT -p tcp --dport <$PORT2> -m recent --rcheck --rsource --seconds 10 --name KNOCK1 -m recent --set --rsource --name KNOCK2
iptables -A INPUT -p tcp --dport <$PORT3> -m recent --rcheck --rsource --seconds 10 --name KNOCK2 -m recent --set --rsource --name PASSED
iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --rcheck --rsource --seconds 10 --name PASSED -j ACCEPT
iptables -A INPUT -p tcp -m multiport --dports <$PORT1>,<$PORT2>,<$PORT3> -j ACCEPT

iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j DROP
```

---
1. [http://googlecodejammer.blogspot.de/p/iptables-only.html](http://googlecodejammer.blogspot.de/p/iptables-only.html)
