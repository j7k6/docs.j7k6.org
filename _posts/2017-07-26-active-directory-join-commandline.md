---
layout: post
title: "Join Active Directory on Commandline"
tags: [windows,active-directory,shell]
---

```powershell
netdom join %computername% /domain:<DOMAIN> /UserD:<DOMAIN>\<ADMIN> /PasswordD:"<ADMIN_PASSWORD>"
shutdown /r /f /t 0
```

---
