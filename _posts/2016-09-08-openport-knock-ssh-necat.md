---
layout: post
title: "Open Port Knock Guarded SSH Port with Netcat"
tags: [ssh, port-knocking, netcat, network]
---

```bash
for PORT in <$PORT1> <$PORT2> <$PORT3>; do nc -vz <$SSH_HOST> <$PORT>; done; ssh <$SSH_USER>@<$SSH_HOST>
```

---
