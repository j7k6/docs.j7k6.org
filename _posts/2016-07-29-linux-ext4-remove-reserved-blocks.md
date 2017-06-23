---
layout: post
title: "Remove Reserved Blocks from Ext4 Partition"
tags: [linux, ext4]
---

```bash
tune2fs -m 0 /dev/sda1
```

---
