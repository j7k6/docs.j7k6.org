---
layout: post
title: "Restore TimeMachine Backup of older HFS+ based macOS Disk on High Sierra APFS-converted Disk"
---

Trying to restore a TimeMachine Backup of a *HFS+* formatted macOS disk on a Mac that had previously installed High Sierra and thereby has its disk converted to the new *APFS*, results in an error and put the Mac into an unusable state.

The problem is that the High Sierra Installer Mode doesn't support non-APFS base TimeMachine backups (but doesn't warn about it either).

> **Note**: This doesn't refer to the backup-disk itself, but to the filesystem of the source operating system!

The solution is rather complicated and time consuming because it requires to install the originating *OS X* version of the Mac (the one it was shipped with), but it's the only way to restore a TimeMachine backup in that scenario:

1. Press `command` + `option` + `r` while booting to enter **Internet Recovery Mode**.
2. Install the MacBook's originally shipped version of **OS X**.
3. Reboot and press `command` + `r` while booting to enter **Installer Mode**.
4. Restore from TimeMachine Backup.

This works, because the older Installer Mode supported TimeMachine Backups of HFS+ formatted disks.

---
