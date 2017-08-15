---
layout: post
title: "Get New Tor Identity on a Whonix Client with Netcat"
tags: [tor, whonix, netcat]
---

```bash
printf "signal newnym\nquit\n" | nc -w 1 10.152.152.10 9052
```

---
