---
layout: post
title: "Enable BitLocker Disk Encryption in VirtualBox Windows VM"
tags: [windows,bitlocker,virtualbox]
---

1. Run *Group Policy Editor*:
   ```powershell
   gpedit.msc
   ```
2. Navigate to *Local Computer Policy > Computer Configuration > Administrative Templates > Windows Components > Bitlocker Drive Encryption > Operation System Drives > Require additional authentication at startup*.
3. Check ***Enabled*** and ***Allow Bitlocker without compatible TPM (...)***.

---
1. [https://www.howtogeek.com/howto/6229/how-to-use-bitlocker-on-drives-without-tpm/](https://www.howtogeek.com/howto/6229/how-to-use-bitlocker-on-drives-without-tpm/)
