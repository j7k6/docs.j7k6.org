---
layout: post
title: "Increase Maximum Number of ActiveSync Devices in Exchange 2010"
tags: [windows-server, exchange]
---

1. Create new Policy:
```powershell
New-Throttlingpolicy "Increased ActiveSync Devices" -EasMaxDevices 20 -EasMaxConcurrency 20
```

2. Apply Policy to Mailbox:
```powershell
Set-Mailbox $MAILBOX -ThrottlingPolicy "Increased ActiveSync Devices"
```

3. Increase Values
```powershell
Set-Throttlingpolicy "Increased ActiveSync Devices" -EasMaxDevices 25 -EasMaxConcurrency 25
```

---
1. [http://www.msexchange.org/kbase/ExchangeServerTips/ExchangeServer2010/Mobility/HowtoincreasethemaximumnumberofActiveSyncDevicesforaUser.html](http://www.msexchange.org/kbase/ExchangeServerTips/ExchangeServer2010/Mobility/HowtoincreasethemaximumnumberofActiveSyncDevicesforaUser.html)
