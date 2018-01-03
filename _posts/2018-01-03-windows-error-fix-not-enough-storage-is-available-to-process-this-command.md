---
layout: post
title: "Fix Windows Error 'Not enough storage is available to process this command'"
tags: [windows,fix]
---

### Problem
When I tried using *Robocopy* to sync network shares, it suddenly failed with this error message:
```
Not enough storage is available to process this command
```

### Solution
1. Open `regedit.exe` (with admin rights)
2. Navigate to `HKEY_LOCAL_MACHINE` > `SYSTEM` > `CurrentControlSet` > `Services` > `LanmanServer` > `Parameters`
3. Create new *DWORD (32-bit) Value* `IRPStackSize` with a decimal value higher than *15* (e.g. *40*).
4. Reboot computer

---
1. [https://support.microsoft.com/en-au/help/106167/error-message-not-enough-server-storage-is-available-to-process-this-c](https://support.microsoft.com/en-au/help/106167/error-message-not-enough-server-storage-is-available-to-process-this-c)
