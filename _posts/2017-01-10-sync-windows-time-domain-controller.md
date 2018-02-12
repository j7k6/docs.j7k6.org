---
layout: post
title: "Sync Windows Time with Domain Controller"
tags: [windows, active-directory, ntp]
---

```powershell
net time /DOMAIN:<$DOMAIN> /set /y
```

---
