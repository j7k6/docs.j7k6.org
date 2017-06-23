---
layout: post
title: "SSH Jump Host Config"
tags: [ssh]
---

`~/.ssh/config`:
```
Host $JUMP_HOST
  HostName $JUMP_HOST_IP
  User $JUMP_USER

Host $TARGET_HOST
  Hostname $TARGET_HOST_IP
  User $TARGET_USER
  ProxyCommand ssh $JUMP_USER@$JUMP_HOST nc -w 120 %h %p
```

---
