---
layout: post
title: "Force Azure AD Connect Synchronization"
tags: [azure,active-directory,powershell,windows-server]
---

Run [**Azure Active Directory Module for Windows PowerShell**](http://connect.microsoft.com/site1164/Downloads/DownloadDetails.aspx?DownloadID=59185) as Administrator.

### Delta Synchronization
```powershell
Start-ADSyncSyncCycle -PolicyType Delta
```

### Full Synchronization
```powershell
Start-ADSyncSyncCycle -PolicyType Initial
```

---
