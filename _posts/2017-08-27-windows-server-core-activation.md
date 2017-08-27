---
layout: post
title: "Activate Windows Server Core"
tags: [windows-server]
---

```powershell
slmgr.vbs -ipk <PRODUCT_KEY>
slmgr.vbs -ato
```

---
1. [https://technet.microsoft.com/en-us/library/jj592692(v=ws.11).aspx#BKMK_1.5](https://technet.microsoft.com/en-us/library/jj592692(v=ws.11).aspx#BKMK_1.5)
