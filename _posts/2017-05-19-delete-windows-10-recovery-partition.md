---
layout: post
title: "Delete Windows 10 Recovery Partition"
tags: [windows-10, fix]
---

1. `diskpart`
3. `select disk 0`
3. `list partition`
4. `select partition <$PARTITION_ID>`
5. `delete partition override`

---
1. [https://social.technet.microsoft.com/Forums/windows/en-US/4f1b84ac-b193-40e3-943a-f45d52e23685/cant-delete-extra-healthy-recovery-partitions-and-healthy-efi-system-partition?forum=w8itproinstall](https://social.technet.microsoft.com/Forums/windows/en-US/4f1b84ac-b193-40e3-943a-f45d52e23685/cant-delete-extra-healthy-recovery-partitions-and-healthy-efi-system-partition?forum=w8itproinstall)
