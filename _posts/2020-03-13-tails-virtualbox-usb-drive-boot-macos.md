---
layout: post
title: "Run Tails from USB Drive in VirtualBox on macOS"
fav: 1
---

Booting a Tails USB drive in a VirtualBox VM is rather complicated because VirtualBox is not able to boot from USB. The workaround consists of using VirtualBox' [*raw hard disk access*](https://www.virtualbox.org/manual/ch09.html#rawdisk) and modifying the Tails boot command.

## VirtualBox VM
1. Download the [Tails VM ISO](https://tails.boum.org/install/vm-download/index.en.html).
2. Create a new VM in VirtualBox:
   - Type: `Linux`
   - Version: `Debian (64-bit)`
   - `Do not add a virtual hard disk`
3. Edit VM settings:
   - `Ports` → `USB` → `Enable USB 3.0`
   - `Storage` → Attach Tails ISO
4. Start VM & Boot Tails ISO.
5. Attach USB drive to VM (`Devices` → `USB` → ...).

## Tails Installation
Install Tails by cloning it to the connected USB drive (`Applications` → `Tails` → `Tails Installer` → `Clone the current Tails`).

Later, the Tails USB drive will be used in *raw hard disk access* mode. It will be connected as a hard disk to the virtual SATA controller. Booting from a hard disk is not intended by Tails, so it will fail to start.

The solution for this is modifying the boot command. The boot command can either be changed temporarily at boot time or permanently by writing the modification to the Tails USB drive boot partition.

## Boot Command Workaround
### Permanently
1. Open `Terminal` after finishing the Tails cloning process.
2. Run:
   ```bash
   sudo mount /dev/sda1 /mnt
   sudo sed -i 's/live-media=removable //g' /mnt/syslinux/live*.cfg
   sudo umount /dev/sda1
   ```

### Temporary
1. Boot VM.
2. Press `TAB`.
3. Remove `live-media=removable` from the boot command.
4. Continue booting.

## Raw Hard Disk Access
The USB drive needs to be made available in *raw disk access* mode on the macOS host:
1. List available disks (e.g. `/dev/disk2`):
   ```bash
   sudo diskutil list
   ```
2. Unmount USB disk:
   ```bash
   sudo diskutil unmountDisk /dev/disk2
   ```
3. Own disk device:
   ```bash
   sudo chown <$USERNAME> /dev/disk2
   ```
4. Create raw disk:
   ```bash
   VBoxManage internalcommands createrawvmdk -filename ~/VirtualBox\ VMs/tails/usb.vmdk -rawdisk /dev/disk2
   ```

## Boot Tails from USB Drive
1. Attach `usb.vmdk` to VM's virtual SATA controller.
2. Detach Tails ISO.
3. Start VM.
4. Boot Tails.
5. At the welcome screen set an `Administrator Password` (`Additional Settings` → `+`).
6. *Start Tails*.

## Encrypted Persistence
To enable the encrypted persistant volume, another workaround needs to be applied because Tails won't enable the encrypted persistence on a "hard disk".
1. Edit `/usr/share/perl5/Tails/Persistence/Setup.pm`.
2. Find & delete the `foreach my $check (@checks) {` loop block.
3. `Applications` → `Tails` → `Configure persistent volume`.

---
1. <https://www.virtualbox.org/manual/ch09.html#rawdisk>
2. <https://www.reddit.com/r/tailswiki/wiki/index/internal-hd-install>
3. <https://www.reddit.com/r/tails/comments/9u371g/how_to_install_tails_3_to_hdd_fixed_drive/>
