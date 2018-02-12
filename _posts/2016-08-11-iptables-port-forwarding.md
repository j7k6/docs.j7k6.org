---
layout: post
title: "Port Forwarding with IPtables"
tags: [network, linux, iptables]
---

```bash
iptables -t nat -A PREROUTING -p tcp -i eth0 --dport <$PORT> -j DNAT --to-destination <$DEST_IP>:<$DEST_PORT>
iptables -A FORWARD -p tcp -d <$DEST_IP> --dport <$DEST_PORT> -j ACCEPT
```

---
