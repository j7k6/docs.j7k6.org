---
layout: post
title: "Force FSMO Role Takeover on Domain Controller"
tags: [active-directory,windows-server,domain-controller]
---

```powershell
Move-ADDirectoryServerOperationMasterRole -Identity <$DC> -OperationMasterRole 0,1,2,3,4 -Force -Credential (Get-Credential) -server <$DC>
```

---
