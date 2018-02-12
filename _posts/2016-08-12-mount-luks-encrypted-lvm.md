---
layout: post
title: "Mount LUKS-Encrypted LVM"
tags: [luks, lvm, encryption, linux]
---

### Decrypt LUKS:
```bash
cryptsetup luksOpen <$DISK> <$MAPPER_LABEL>
```

### Scan LVMs
```bash
vgscan
```

### Activate Volume Group
```bash
vgchange -ay <$VOLUME_GROUP>
```

### List Logical Volumes
```bash
lvs
```

### Mount Logical Volume
```bash
mount /dev/<$VOLUME_GROUP>/<$LOGICAL_VOLUME> /mnt
```

---
