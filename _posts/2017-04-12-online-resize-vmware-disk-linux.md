---
layout: post
title: "Online-Resize of VMWare Disk in a Linux VM"
tags: [vmware, esxi, linux]
---

1. Trigger kernel to acknowledge disk size changes:
   ```bash
   for DEV in `ls /sys/class/scsi_device`; do
     echo 1 > /sys/class/scsi_device/$DEV/device/rescan;
   done
   ```
2. Run `fdisk /dev/sda` to delete and recreate the last partition.
3. Run `partprobe` to let the kernel re-read the partition table.
4. Expand the partition: `resize2fs /dev/sda<#>`

---
