---
layout: post
title: "Get Mailbox Size in Exchange"
---

```powershell
Get-MailboxStatistics <$USER> | ft DisplayName, TotalItemSize, ItemCount
```

---
