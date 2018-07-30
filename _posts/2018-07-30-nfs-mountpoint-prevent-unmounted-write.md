---
layout: post
title: "Prevent Writes to Local Disk when NFS Mountpoint is not mounted"
tags: [nfs,linux]
---

A common problem when using NFS mountpoints for backup (or any other) purposes is that if the NFS share is being unmounted for whatever reason, the backup application wouldn't know and just write to the mount point directory, which now would be just a directory on the local disk. The result is a full local hard disk.
To prevent write access to a local directory, but enable it when being mounted, the **immutable** flag has to be set for that mount point:

1. Unmount Directory:
   ```bash
   umount /mnt/backup
   ```
2. Set 'immutable' Flag:
   ```bash
   chattr +i /mnt/backup
   ```
3. Mount Directory again:
   ```bash
   mount /mnt/backup
   ```

---
1. <https://serverfault.com/a/314022>
