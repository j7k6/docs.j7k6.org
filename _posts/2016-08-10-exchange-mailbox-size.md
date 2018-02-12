---
layout: post
title: "Get Mailbox Size in Exchange"
tags: [mail, exchange, powershell]
---

```powershell
Get-MailboxStatistics <$USER> | ft DisplayName, TotalItemSize, ItemCount
```

---
