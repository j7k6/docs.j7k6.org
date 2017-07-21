---
layout: post
title: "Repair Active Directory Database"
tags: [active-directory,windows-server,fix]
---

1. Log-in to Domain Controller
2. Reboot into DSRM:
   ```powershell
   bcdedit /set safeboot dsrepair 
   shutdown -t 0 -r 
   ```
3. Run Database Check:
   ```powershell
   esentutl /g c:\Windows\NTDS\ntds.dit /!10240 /8 /o
   ```
4. If the check return **CORRUPTED**, run `ntdsutil` for *Soft Recovery*:
   ```powershell
   activate instance ntds
   files
   recover
   quit
   quit
   ```
5. Delete *LOG* and *CHK* files:
   ```powershell
   del c:\Windows\NTDS\*.log
   del c:\Windows\NTDS\*.chk
   ```
6. Run *Hard Recovery*:
   ```powershell
   esentutl /p c:\Windows\NTDS\ntds.dit /!10240 /8 /o
   ```
7. Run `ntdsutil` again:
   ```powershell
   semantic database analysis
   go
   go fix
   quit
   quit
   ```
8. Run Database Check, again:
   ```powershell
   esentutl /g c:\Windows\NTDS\ntds.dit /!10240 /8 /o
   ```
9. Disable DSRM and Reboot:
   ```powershell
   bcdedit /deletevalue safeboot
   shutdown -t 0 -r
   ```

---
1. [https://technet.microsoft.com/de-de/library/cc816897(v=ws.10).aspx](https://technet.microsoft.com/de-de/library/cc816897(v=ws.10).aspx)
2. [http://www.dell.com/support/article/de/de/dedhs1/sln289101/windows-server--active-directory-database-repair-after-domain-controller-failure?lang=en](http://www.dell.com/support/article/de/de/dedhs1/sln289101/windows-server--active-directory-database-repair-after-domain-controller-failure?lang=en)
3. [http://terenceluk.blogspot.de/2011/05/message-active-instance-not-set-to-set.html](http://terenceluk.blogspot.de/2011/05/message-active-instance-not-set-to-set.html)
