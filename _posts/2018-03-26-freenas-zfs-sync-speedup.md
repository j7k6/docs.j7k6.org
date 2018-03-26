---
layout: post
title: "Speed-up NFS Performance on FreeNAS by Disabling ZFS Sync"
tags: [freenas,zfs,nfs]
---

```bash
zfs set sync=disabled <$DATASET>
```

![freenas-zfs-sync-speedup](/files/freenas-zfs-sync-speedup.png)

---
1. [https://blogs.serioustek.net/post/2013/02/20/freenas-esx-and-nfs-synchronous-writes-and-the-zil-aspx](https://blogs.serioustek.net/post/2013/02/20/freenas-esx-and-nfs-synchronous-writes-and-the-zil-aspx)
