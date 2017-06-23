---
layout: post
title: "Show TCP/IP Stats on Windows"
tags: [tcpip, windows]
---

```powershell
netsh interface ipv4 show ipstats

netsh interface ipv4 show tcpstats
```

If `In Errors`, `In Header Errors` or `Fragments Failed` have a value >0, there is a physical wire problem.

---
1. [http://superuser.com/a/934112](http://superuser.com/a/934112)
