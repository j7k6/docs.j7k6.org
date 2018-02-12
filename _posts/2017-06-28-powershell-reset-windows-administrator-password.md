---
layout: post
title: "Reset Windows Administrator Password with Powershell"
tags: [windows, password, powershell]
---

```powershell
([adsi]"WinNT://<$COMPUTER_NAME>/Administrator,user").SetPassword("$NEW_PASSWORD")
```

---
