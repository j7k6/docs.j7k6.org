---
layout: post
title: "Sync Windows Server Time with NTP"
tags: [windows, ntp]
---

```powershell
w32tm /resync /computer:time.windows.com /nowait
```

---
