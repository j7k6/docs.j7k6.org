---
layout: post
title: "Create bootable Windows USB Installer"
tags: [windows,diskpart]
---

1. Open `cmd` as Administrator.
2. Run  `diskpart`
3. `list disk`
4. `select disk <$DISK_ID>`
5. `clean`
6. `create partition primary`
7. `select partition 1`
8. `active`
9. `format fs=fat32 quick`
10. `exit`
11. Copy Windows ISO image content to newly formatted USB drive. 

---
