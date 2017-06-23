---
layout: post
title: "Open Port in Windows Firewall"
tags: [windows, firewall]
---

```powershell
netsh firewall set portopening tcp $PORT "$DESCRIPTION" enable all
```

---
