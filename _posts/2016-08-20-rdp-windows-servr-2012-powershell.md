---
layout: post
title: "Enable RDP on Windows Server 2012 R2 with Powershell"
tags: [rdp, windows-server, powershell]
---

### Enable RDP
```powershell
set-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Control\Terminal Server'-name "fDenyTSConnections" -Value 0
```

### Allow RDP in firewall
```powershell
Set-NetFirewallRule -Name RemoteDesktop-UserMode-In-TCP -Enabled true
```

### Enable secure RDP authentication
```powershell
set-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp' -name "UserAuthentication" -Value 1   
```

---
1. [https://networkerslog.blogspot.de/2013/09/how-to-enable-remote-desktop-remotely.html](https://networkerslog.blogspot.de/2013/09/how-to-enable-remote-desktop-remotely.html)
