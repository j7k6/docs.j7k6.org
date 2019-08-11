---
layout: post
title: "Mount Partition from VMWare .vmdk Disk Image on Linux"
tags: [vmware, linux, esxi]
---

## Mount
```bash
losetup /dev/loop0 <$VMDK_FLAT_FILE>
losetup -o $(($(fdisk -l | awk '/^\/dev\/loop0p1/ { if($2=="*") print $3; else print $2; }')*512)) /dev/loop1 /dev/loop0
mount /dev/loop1 /mnt
```

## Unmount
```bash
umount /mnt
losetup -d /dev/loop0 /dev/loop1
```

---
