---
layout: post
title: "Export all Exchange Mailboxes as .pst"
tags: [exchange]
---

```powershell
foreach ($Mailbox in (Get-Mailbox)) { New-MailboxExportRequest -Mailbox $Mailbox -FilePath "\\<$NETWORK_SHARE>\$($Mailbox.Alias).pst" }
```

---
1. [https://www.codetwo.com/admins-blog/exchange-mailbox-backup-pst-pros-cons/](https://www.codetwo.com/admins-blog/exchange-mailbox-backup-pst-pros-cons/)
