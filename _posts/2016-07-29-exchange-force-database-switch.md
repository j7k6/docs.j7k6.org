---
layout: post
title: "Force Exchange to switch over to other Database"
tags: [exchange]
---

```powershell
Move-ActiveMailboxDatabase $DATABASE -ActivateOnServer $SERVER -SkipLagCheck -SkipClientExperience -SkipHealthChecks -MountDialOverride:None
```

---
