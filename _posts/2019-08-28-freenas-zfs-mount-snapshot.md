---
layout: post
title: "Mount ZFS Snapshot"
---

```bash
zfs list -t snapshot
mount -t zfs <$SNAPSHOT> <$MOUNTPOINT>
```

---
