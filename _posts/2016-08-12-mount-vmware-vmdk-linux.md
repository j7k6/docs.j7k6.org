---
layout: post
title: "Mount Partition from VMWare .vmdk Disk Image on Linux"
tags: [vmware, linux, esxi]
---

```bash
losetup /dev/loop0 $VMDK_FLAT_FILE

PARTITION=2
OFFSET=`fdisk -l 2>/dev/null | grep "/dev/loop0p$PARTITION" | awk '{ if($2=="*") print $3; else print $2; }'`

losetup -o $(($OFFSET*512)) /dev/loop1 /dev/loop0
mount /dev/loop1 /mnt
```

---
