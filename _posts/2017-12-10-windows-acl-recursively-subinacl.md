---
layout: post
title: "Fix Permissions/ACLs on Windows Recursively with SubinACL"
tags: [acl,windows,fix]
---

> `subinacl.exe` can be downloaded [here](https://www.microsoft.com/en-us/download/details.aspx?id=23510)

```powershell
subinacl.exe /subdirectories <FOLDER> /grant="<DOMAIN>\<USER>"=F /setowner="<DOMAIN>\<USER>"
```

---
