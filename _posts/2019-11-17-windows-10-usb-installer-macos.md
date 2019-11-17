---
layout: post
title: "Create Windows 10 USB Installer on macOS"
---

1. List available disks to get `<$USB_DISK>` (e.g. *disk4*).
   ```bash
   sudo diskutil list
   ```
2. Format USB disk:
   ```bash
   sudo diskutil eraseDisk FAT32 "WIN10USB" MBRFormat <$USB_DISK>
   ```
3. This command mounts the Windows 10 ISO file and copies its contents to the USB disk:
   ```bash
   sudo rsync -av $(hdiutil mount <$WINDOWS_ISO_FILE> | awk '{print $2}')/. /Volumes/WIN10USB/
   ```
4. Eject USB disk:
   ```
   sudo diskutil eject <$USB_DISK>
   ```

---
