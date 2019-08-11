---
layout: post
title: "Backup & Restore MBR with dd"
tags: [backup, dd, mbr]
---

## Backup MBR to file
```bash
dd if=/dev/sda of=mbr.img bs=446 count=1
```

## Restore MBR to disk
```bash
dd if=mbr.img of=/dev/sda bs=446 count=1
```

---
