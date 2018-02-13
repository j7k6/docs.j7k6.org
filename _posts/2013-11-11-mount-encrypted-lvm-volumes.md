---
layout: post
title: "Arch Linux: Mount Encrypted LVM Volumes"
tags: [arch-linux,linux,lvm,luks]
---

## Boot...
...from the Arch Linux installer CD.

## Show Available Drives
```bash
fdisk -l
```

## Decrypt & Open LUKS
```bash
cryptsetup luksOpen /dev/sda<$N> <$MAPPER>
```

## Find Volume Groups
```bash
vgscan
```

## Activate Volume Group
```bash
vgchange -ay <$VOLGROUP>
```

## Show Available Volumes
```bash
lvs
```

## Mount Volume
```bash
mount /dev/<$VOLGROUP>/<$VOLUME> /mnt
```

---
