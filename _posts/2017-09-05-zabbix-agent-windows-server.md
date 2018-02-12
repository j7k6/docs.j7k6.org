---
layout: post
title: "Install Zabbix Agent on Windows Server"
tags: [zabbix,windows-server,monitoring]
---

1. Download *Zabbix Agent*:
   ```powershell
   cd c:\
   Invoke-WebRequest -Uri "https://www.zabbix.com/downloads/3.4.0/zabbix_agents_3.4.0.win.zip" -OutFile "zabbix_agents_3.4.0.win.zip"
   Expand-Archive "c:\zabbix_agents_3.4.0.win.zip" -DestinationPath "c:\zabbix"
   ```
2. Set Configuration Parameters:
   ```powershell
   del "c:\zabbix\conf\zabbix_agentd.win.conf"

   "Server=<$ZABBIX_SERVER>" | Out-File -FilePath "c:\zabbix\conf\zabbix_agentd.win.conf" -Encoding ASCII
   "ServerActive=<$ZABBIX_SERVER>" | Out-File -FilePath "c:\zabbix\conf\zabbix_agentd.win.conf" -Encoding ASCII -Append
   "Hostname=<$ZABBIX_AGENT>" | Out-File -FilePath "c:\zabbix\conf\zabbix_agentd.win.conf" -Encoding ASCII -Append
   "LogFile=c:\zabbix\zabbix_agentd.log"  | Out-File -FilePath "c:\zabbix\conf\zabbix_agentd.win.conf" -Encoding ASCII -Append
   ```
3. Install Service & Start *Zabbix Agent*:
   ```powershell
   c:\zabbix\bin\win64\zabbix_agentd.exe --config "c:\zabbix\conf\zabbix_agentd.win.conf" --install
   c:\zabbix\bin\win64\zabbix_agentd.exe --start
   ```
4. Open Zabbix Ports in Firewall:
   ```powershell
   netsh advfirewall firewall add rule name="Open Zabbix agentd port 10050 inbound" dir=in action=allow protocol=TCP localport=10050
   netsh advfirewall firewall add rule name="Open Zabbix agentd port 10050 outbound" dir=out action=allow protocol=TCP localport=10050
   netsh advfirewall firewall add rule name="Open Zabbix trapper port 10051 inbound" dir=in action=allow protocol=TCP localport=10051
   netsh advfirewall firewall add rule name="Open Zabbix trapper port 10051 outbound" dir=out action=allow protocol=TCP localport=10051
   ```

---
