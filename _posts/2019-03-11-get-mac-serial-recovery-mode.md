---
layout: post
title: "Get Mac Serial Number in Recovery Mode Terminal"
---

```bash
ioreg -rd1 -c IOPlatformExpertDevice | awk -F'"' '/IOPlatformSerialNumber/{print $4}'
```

---
1. <https://www.neverhadtofight.com/blog/2018/06/19/find-a-macs-serial-number-in-recovery-partition-or-the-macos-installer/>
