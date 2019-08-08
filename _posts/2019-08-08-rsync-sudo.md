---
layout: post
title: "Rsync Transfer with Remote Sudo Access"
---

1. Enable passwordless **sudo** access for the `rsync` command on the remote machine: `visudo`
   ```
   <$USER> ALL=(ALL) NOPASSWD: /usr/bin/rsync
   ```
2. Transfer files from the remote machine with sudo access:
   ```bash
   rsync --progress -rave 'ssh' --rsync-path='sudo rsync' <$REMOTE_USER>@<$REMOTE_SERVER>:<$REMOTE_SOURCE> <$LOCAL_DESTINATION>
   ```

---
