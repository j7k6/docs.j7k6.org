---
layout: post
title: "Fix Exchange 2010 Error 'The user load quota of 1000 requests per 2 seconds has been exceeded'"
---

```powershell
Import-Module WebAdministration
Restart-WebAppPool MsExchangePowerShellAppPool
```

---
