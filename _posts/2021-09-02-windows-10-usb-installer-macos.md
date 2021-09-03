---
layout: post
title: "Create Windows 10 USB Installer on macOS"
fav: 1
---

1. Download [Windows 10 ISO](https://www.microsoft.com/de-de/software-download/windows10ISO).
2. Install `wimlib`:
   ```bash
   brew install wimlib
   ```
3. Plug in USB drive (>= 8GB).
4. List available disks to get device name (e.g. *disk2*):
   ```bash
   diskutil list
   ```
5. Unmount USB drive:
   ```bash
   diskutil unmountDisk /dev/disk2
   ```
6. Format USB drive:
   ```bash
   sudo diskutil eraseDisk FAT32 "WIN10" MBRFormat /dev/disk2
   ```
7. Mount Windows 10 ISO:
   ```bash
   hdiutil mount Win10_21H1_German_x64.iso
   ```
8. Copy files:
   ```bash
   rsync -va --exclude=sources/install.wim /Volumes/CCCOMA_X64FRE_DE-DE_DV9/* /Volumes/WIN10/
   ```
9. Split the `sources/install.vim` file to be a bit less then 4GB. This step is necessary because the FAT32 file system limits the maximum file size to 4GB.
   ```bash
   wimlib-imagex split /Volumes/CCCOMA_X64FRE_DE-DE_DV9/sources/install.wim /Volumes/WIN10/sources/install.swm 3800
   ```
4. Eject USB drive:
   ```
   diskutil eject /dev/disk2
   ```

---
1. <https://www.freecodecamp.org/news/how-make-a-windows-10-usb-using-your-mac-build-a-bootable-iso-from-your-macs-terminal/>
