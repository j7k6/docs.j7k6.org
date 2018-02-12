---
layout: post
title: "SSH Tunnel Cheat Sheet"
tags: [ssh]
---

```bash
# $LOCAL_IP: 'localhost' or machine from local network
# $LOCAL_PORT: open port on local machine
# $REMOTE_IP: remote localhost or IP from remote network
# $REMOTE_PORT: open port on remote site

# Forward Tunnel: map port from remote machine/network on local machine
ssh -L <$LOCAL_PORT>:<$REMOTE_IP>:<$REMOTE_PORT> <$USER>@<$SERVER>

# Reverse Tunnel: make local port accessable to remote machine
ssh -R <$REMOTE_PORT>:<$LOCAL_IP>:<$LOCAL_PORT> <$USER>@<$SERVER>
```

---
