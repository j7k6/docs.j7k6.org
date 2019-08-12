---
layout: post
title: "Arch Linux: Mount Encrypted LVM Volumes"
---

1. Boot from the Arch Linux installer CD.
2. Show available drives:
   ```bash
   fdisk -l
   ```
3. Decrypt & open LUKS:
   ```bash
   cryptsetup luksOpen /dev/sda<$N> <$MAPPER>
   ```
4. Find volume groups:
   ```bash
   vgscan
   ```
5. Activate volume group:
   ```bash
   vgchange -ay <$VOLGROUP>
   ```
6. Show available volumes:
   ```bash
   lvs
   ```
7. Mount volume
   ```bash
   mount /dev/<$VOLGROUP>/<$VOLUME> /mnt
   ```

---
