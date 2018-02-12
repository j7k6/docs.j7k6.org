---
layout: post
title: "Reset Exchange OWA Virtual Directory"
tags: [exchange, owa]
---

```powershell
Remove-OwaVirtualDirectory -Identity '<$SERVER>\owa (Default Web Site)'
New-OwaVirtualDirectory -InternalUrl 'https://<$FQDN>/owa' -WebSiteName 'Default Web Site'
```

---
