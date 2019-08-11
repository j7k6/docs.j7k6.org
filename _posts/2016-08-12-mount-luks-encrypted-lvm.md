---
layout: post
title: "Mount LUKS-Encrypted LVM"
fav: 1
---

1. Decrypt LUKS:
   ```bash
   cryptsetup luksOpen <$DISK> <$MAPPER_LABEL>
   ```
2. Scan LVMs:
   ```bash
   vgscan
   ```
3. Activate Volume Group:
   ```bash
   vgchange -ay <$VOLUME_GROUP>
   ```
4. List Logical Volumes:
   ```bash
   lvs
   ```
5. Mount Logical Volume:
   ```bash
   mount /dev/<$VOLUME_GROUP>/<$LOGICAL_VOLUME> /mnt
   ```

---
