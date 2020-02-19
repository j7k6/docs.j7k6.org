---
layout: post
title: "Enable Outlook Programmatic Access Permanently"
---

Run `cmd.exe` (as administrator):
```powershell
reg add "HKCU\Software\Policies\Microsoft\Office\16.0\outlook\security" /f /v "PromptOOMSend" /t REG_DWORD /d 2
reg add "HKCU\Software\Policies\Microsoft\Office\16.0\outlook\security" /f /v "AdminSecurityMode" /t REG_DWORD /d 3
reg add "HKCU\Software\Policies\Microsoft\Office\16.0\outlook\security" /f /v "promptoomaddressinformationaccess" /t REG_DWORD /d 2
reg add "HKCU\Software\Policies\Microsoft\Office\16.0\outlook\security" /f /v "promptoomaddressbookaccess" /t REG_DWORD /d 2
```

---
1. https://www.slipstick.com/developer/change-programmatic-access-options/
