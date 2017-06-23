---
layout: post
title: "Clone Disk over SSH with dd"
tags: [dd, ssh, linux]
---

```bash
ssh -C $USER@$REMOTE_HOST "dd if=/dev/sda" | dd of=/dev/sda
```

---
