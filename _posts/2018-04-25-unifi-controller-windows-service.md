---
layout: post
title: "Unifi Controller as Windows Service"
tags: [unifi,windows]
---

1. Run command prompt (`cmd`, **NOT** `powershell`) as administrator.
2. Install service:
   ```ps
   java -jar "%UserProfile%\Ubiquiti UniFi\lib\ace.jar" installsvc
   ```
3. Start service:
   ```ps
   java -jar "%UserProfile%\Ubiquiti UniFi\lib\ace.jar" startsvc
   ```

---
1. [https://help.ubnt.com/hc/en-us/articles/205144550-UniFi-Run-the-controller-as-a-Windows-service](https://help.ubnt.com/hc/en-us/articles/205144550-UniFi-Run-the-controller-as-a-Windows-service)
