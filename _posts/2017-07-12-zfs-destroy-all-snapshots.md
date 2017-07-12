---
layout: post
title: "Destroy all ZFS Snapshots"
tags: [zfs]
---

```bash
zfs list -H -t snapshot -o name | xargs -n1 zfs destroy 2>/dev/null
```

---
1. [https://sysadminman.net/blog/2008/remove-all-zfs-snapshots-50#comment-1469](https://sysadminman.net/blog/2008/remove-all-zfs-snapshots-50#comment-1469)
