---
layout: post
title: "Restart all Exchange Services"
tags: [exchange]
---

```powershell
$services = Get-Service | ? { $_.name -like "MSExchange*" -and $_.Status -eq "Running"}
foreach ($service in $services) {Restart-Service $service.name -Force}
```

---
1. [http://www.zerohoursleep.com/2010/09/quick-tip-restarting-all-microsoft-exchange-services/](http://www.zerohoursleep.com/2010/09/quick-tip-restarting-all-microsoft-exchange-services/)
