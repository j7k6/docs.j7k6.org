---
layout: post
title: "Export .pst in Exchange"
---

1. Create request:
   ```powershell
   New-MailboxExportRequest -Mailbox <$ALIAS> -FilePath \\<$PATH_TO_PST>`
   ```
2. Check request status:
   ```powershell
   Get-MailboxExportRequest
   ```
3. Wait for `Status=Completed`
4. Remove request:
   ```powershell
   Get-MailboxExportRequest | where {$_.status -eq "Completed"} | Remove-MailboxExportRequest
   ```

---
