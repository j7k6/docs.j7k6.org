---
layout: post
title: "Powershell: Recursive Clone ACLs"
tags: [powershell]
---

```powershell
Get-ChildItem <TARGET> -Recurse -Force | %{
  Get-Acl <SOURCE> | Set-Acl -Path $_.fullname
}
```

---
1. [https://social.technet.microsoft.com/Forums/windowsserver/en-US/d3a11f8f-5771-4730-9bf5-ec75317ff8bf/set-recursive-acl-to-directory-and-its-subdirectories?forum=winserverpowershell](https://social.technet.microsoft.com/Forums/windowsserver/en-US/d3a11f8f-5771-4730-9bf5-ec75317ff8bf/set-recursive-acl-to-directory-and-its-subdirectories?forum=winserverpowershell)
