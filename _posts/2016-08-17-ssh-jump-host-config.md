---
layout: post
title: "SSH Jump Host Config"
---

Edit `~/.ssh/config`:
```
Host <$JUMP_HOST_NAME>
  HostName <$JUMP_HOST_IP>
  User <$JUMP_USER>

Host <$TARGET_HOST_NAME>
  Hostname <$TARGET_HOST_IP>
  User <$TARGET_USER>
  ProxyCommand ssh <$JUMP_USER>@<$JUMP_HOST_NAME> nc -w 120 %h %p
```

---
