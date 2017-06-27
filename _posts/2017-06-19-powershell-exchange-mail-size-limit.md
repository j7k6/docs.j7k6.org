---
layout: post
title: "Set Exchange Mailsize Limits in Powershell"
tags: [exchange, powershell]
---

```powershell
Set-TransportConfig -MaxReceiveSize 50MB -MaxSendSize 50MB
Get-ReceiveConnector | Set-ReceiveConnector -MaxMessageSize 50MB
Get-SendConnector | Set-SendConnector -MaxMessageSize 50MB
```

---
1. [https://www.allmanagedit.com.au/blog/exchange-2013-mailbox-import-failed-how-to-deal-with-it/](https://www.allmanagedit.com.au/blog/exchange-2013-mailbox-import-failed-how-to-deal-with-it/)
