---
layout: post
title: "Fix 'Loading disks' in macOS Disk Utility"
tags: [macos, fix]
---

**Problem**: When a connected USB disk doesn't show up in `Finder` and `Disk Utility` "*Loading disks*" forever, this is happening most likely due to a long-running `fsck` process.

**Solution**: Kill the `fsck` process:
```bash
sudo kill $(ps -ef | awk '/fsck/ {print $2}') 2>/dev/null
```

---
1. [https://discussions.apple.com/message/31006085#message31006085](https://discussions.apple.com/message/31006085#message31006085)
