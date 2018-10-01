---
layout: post
title: "Online-Resize of VMware Disk in a Linux VM"
tags: [vmware, esxi, linux]
fav: 1
---

1. Resize the virtual disk in *vSphere*.
2. Trigger the kernel to acknowledge disk size changes:
   ```bash
   for DEV in `ls /sys/class/scsi_device`; do
     echo 1 > /sys/class/scsi_device/$DEV/device/rescan;
   done
   ```
3. Run `fdisk /dev/sda` to delete and recreate the last partition.
   > **Note**: If the to-be-resized partition is also the boot-partition, don't forget to toggle the 'bootable' flag after recreating (press `a`).
4. Run `partprobe` to let the kernel re-read the partition table (Errors can be ignored).
5. Expand the partition: `resize2fs /dev/sda<#>`

---
