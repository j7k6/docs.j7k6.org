---
layout: post
title: "Exchange: Kill IIS w3wp Process on High Load"
tags: [exchange, iis, fix]
---

IIS uses lots of resources as an Exchange frontend. The *w3wp* process can be on constant high load, which can lead to make the Exchange Server stop working.
The fix for this is a tiny Powershell script, which checks if the load is too high and kills the rogue *w3wp* process. IIS will respawn the process by itself, so everything will continue to work.

This is the Powershell script:

```powershell
$w3wp_proc = get-process w3wp* | where-object {$_.cpu -gt 500}
stop-process -inputobject $w3wp_proc -Force
```

This script has to be executed by the *Task Scheduler* in an arbitrary interval (e.g. 15 minutes).
The command to be run by the *Task Scheduler* is: `Powershell.exe -ExecutionPolicy Bypass D:\w3wp_killer.ps1`, it has to be executed with high privileges.

Successfully tested on Exchange 2013.

---
1. [https://forums.iis.net/post/2040928.aspx](https://forums.iis.net/post/2040928.aspx)
