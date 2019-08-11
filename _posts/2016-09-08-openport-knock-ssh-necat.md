---
layout: post
title: "Open Port Knock Guarded SSH Port with Netcat"
---

```bash
for PORT in <$PORT1> <$PORT2> <$PORT3>; do nc -vz <$SSH_HOST> <$PORT>; done; ssh <$SSH_USER>@<$SSH_HOST>
```

---
