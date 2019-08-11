---
layout: post
title: "Disable SMBv1 on Windows (Server)"
tags: [windows, windows-server, smb, security]
---

## Windows 8/Server 2012
```powershell
Set-SmbServerConfiguration -EnableSMB1Protocol $false
```

## Windows 7/Server 2008R2
```powershell
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\LanmanServer\Parameters" SMB1 -Type DWORD -Value 0 -Force
```

---
1. [https://support.microsoft.com/en-in/help/2696547/how-to-enable-and-disable-smbv1,-smbv2,-and-smbv3-in-windows-vista,-windows-server-2008,-windows-7,-windows-server-2008-r2,-windows-8,-and-windows-server-2012](https://support.microsoft.com/en-in/help/2696547/how-to-enable-and-disable-smbv1,-smbv2,-and-smbv3-in-windows-vista,-windows-server-2008,-windows-7,-windows-server-2008-r2,-windows-8,-and-windows-server-2012)
