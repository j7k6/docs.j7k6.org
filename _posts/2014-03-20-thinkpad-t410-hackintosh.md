---
layout: post
title: "Thinkpad T410 Hackintosh"
tags: [hackintosh, lenovo, t410]
fav: 1
---

The *Lenovo Thinkpad T410* is available on eBay for ~400€ and makes a very good Hackintosh.

There is no original Mac required for installing the Hackintosh! This guide is written for model number **2522-3FG**.

### Original specs:
- Intel Core i7-620M (2.66 GHz)
- 14.1" WXGA+ 1440x900
- NVIDIA Quadro NVS 3100M (256MB)
- 4 GB DDR3 1066 MHz

### Modifications:
- Kingston SSDNow V300 (120 GB) instead of 250 GB HDD
- [Atheros *AR5BHB92*](<http://www.amazon.de/Wireless-AR5BHB92-Dual-band-802-11b-Toshiba/dp/B00EECOXE4>) instead of Intel Ultimate-N 6300

In the beginning there needs to be a Windows 7 (x64) running on the laptop for applying a BIOS update & patch.
Between wiping Windows and installing Lion, there has to be done a temporary Snow Leopard installation, just to create a Lion USB installation thumb drive.
At the end, the Thinkpad T410 will be running a fully functional ***Mac OS X 10.7.5 Lion***!

## Replacing the Wireless Card
Since Intel wireless cards aren't supported by OS X, the card (Intel Ultimate-N 6300) has to be replaced by an Atheros AR5BHB92 to get the WiFi to work on a Hackintosh.

The AR5BHB92 isn't on the whitelist of the T410's BIOS, so the laptop refuses to boot with *Error 1802* if the card is placed in the PCIe slot.
To circumvent this restriction, the BIOS has to be patched with the whitelist removed.

### Requirements
- `6iuj27us.exe` (BIOS Update 1.43, <http://support.lenovo.com/en_US/downloads/detail.page?LegacyDocID=MIGR-74268>)
- `T410-1.43-whitelisted-$01BF000_SLIC.ROM` (Whitelist removal patch, <http://applelife.ru/threads/remove-whitelist-for-bios-lenovo.39745>, [Mirror](/files/thinkpad-t410-hackintosh/Lenovo-bios-t410-1.43-whitelist-removed.zip))
- Packing/clear tape

> **Note**: The wireless card can only be replaced after the BIOS patch has been applied!

### BIOS update & whitelist removal
1. Download BIOS Update 1.43
2. Install & Run
3. Update BIOS & Reboot
4. Run `C:\DRIVERS\FLASH\6iuj17us\64bit\WinPhlash64.exe`
5. Select *Backup BIOS and Flash BIOS with new settings*
   - Specify new BIOS file: `T410-1.43-whitelisted-$01BF000_SLIC.ROM`
   - *Flash BIOS*:
     ![bios-flash](/files/thinkpad-t410-hackintosh/01-bios-flash.png)  
6. Reboot

### "5 beeps, pause, 5 beeps"
The laptop will make 5 beeps, a pause, 5 beeps and then start up normally. The beeping is caused by the security chip, which recognized the whitelist removal patch.

It can be disabled in BIOS (***Security > Security Chip > Disabled***). After disabling the security chip, the beeping will be gone.

### "Pin 20 Tape Trick"
...and the hacking goes on :)

The wireless card will be disabled and won't find any networks by default. It needs to be enabled by a switch on the laptop, which the T410 doesn't have.
So the card needs to be tricked into thinking it is enabled by default.
The trick? Tape over ***pin 20*** of the cards PCIe connectors!

OS X will now recognize the wireless card without any further modifications.

## Snow Leopard

### Requirements
- *Mac OS X 10.6.3 Snow Leopard Retail DVD* (eBay)
- [iBoot 3.3.0](http://www.tonymacx86.com/downloads.php?do=file&id=38)

### Installation
1. Burn iBoot to a CD
2. Boot iBoot CD
3. Insert Snow Leopard DVD, hit F5 & select Snow Leopard Installation DVD
4. Open *Utilities > Disk Utilities*
   - Select HDD/SSD
   - Erase
   - Format: *Mac OS Extended (Journaled)*
5. Close Disk Utils
6. Install
7. Restart
8. Boot from iBoot CD again, into freshly installed Snow Leopard
9. Finish configuration
10. Skip updates
11. ***Done!***  

![snow-leopard-info](/files/thinkpad-t410-hackintosh/02-snow-leopard-info.png)

## Lion
### Requirements
- 8 GB USB thumb drive
- *Mac OS X 10.7.5 Lion InstallESD.dmg*
- [Chameleon Boot Loader](http://www.osx86.net/files/file/3740-chameleon-v22-svn-r2286/)
- [Chameleon Wizard](http://www.osx86.net/files/file/242-chameleon-wizard-422/)
- [Kext Wizard](http://www.osx86.net/files/file/2136-kext-wizard-3-7-10/)
- [Extra.zip](/files/thinkpad-t410-hackintosh/Extra.zip) (kext's & DSDT)

### Prepare USB thumb drive
1. Plug in USB thumb drive
2. Open *Disk Utility*
3. Select USB thumb drive
   - Partition  
     - Volume Scheme: *1 Partition*
     - Option: *GUID Partition Table*
     - Format: *Mac OS Extended (Journaled)*
4. Mount *InstallESD.dmg* (double click)
5. Open *Terminal*:  
   ```bash
   defaults write com.apple.Finder AppleShowAllFiles True
   killall Finder
   ```
6. Mount ***BaseSystem.dmg*** from *Mac OS X Install ESD*
7. Select USB drive in Disk Utility again
   - Restore  
     - Drag *Mac OS X Base System* (from BaseSystem.dmg) to the Source field
     - Drag partition from USB drive to the Destination field
     - *Restore*
8. *Eject Disk Image* from BaseSystem.dmg 
9. Replace the the symlink *Packages* in /System/Installation in *Mac OS X Base System* with the *Packages* folder from *Mac OS X Install ESD*
10. Copy `mach_kernel` from *Mac OS X Install ESD* to *Mac OS X Base System*
11. Run *Kext Wizard*:
   - Intallation
     - Browse for kext's (or drag&drop)
     - Destination: System/Library/Extensions
     - Target Disk: *Mac OS X Base System*
   - Maintenance
     - Select *System/Library/Extensions*
     - Target disk: *Mac OS X Base System*  

### Bootloader

![chameleon-installer](/files/thinkpad-t410-hackintosh/03-chameleon-wizard-boot.png)
  
1. Create folder ***Extra*** on *Mac OS X Base System*
2. Run Chameleon Installer:
   - Change Install Location: *Mac OS X Base System*  
3. Run Chameleon Wizard:
   - org.chameleon.Boot (*see above*)
     - Save to `/Extra/org.chameleon.Boot.plist` on *Mac OS X Base System*
   - SMBios
     - Edit
       - Premade SMBioses
       - Select *MacBook Pro (6,1) - Core i5/i7*
       - Save to `/Extra/SMBIOS.plist` on *Mac OS X Base System*  
4. Copy `DSDT.aml` to */Extra* on *Mac OS X Base System*
5. Copy kext folder to */Extra*  on *Mac OS X Base System*
6. Restart

### Installation
1. Boot from USB thumb drive 
   - Select *Mac OS X Base System*
2. Run *Disk Utility*
   - Select HDD/SSD
     - Erase
     - Format: *Mac OS Extended (Journaled)*
3. Install
4. Restart
5. Boot from USB thumb drive into the installer again
6. Open *Terminal*:
   ```bash
   cp -R /Extra /Volumes/<$OSX>/
   cp -R /Volumes/<$OSX>/Extra/kexts/* /Volumes/<$OSX>/System/Libraries/Extensions
   chmod -R 755 /Volumes/<$OSX>/System/Libraries/Extensions
   chown -R root:wheel /Volumes/<$OSX>/System/Libraries/Extensions
   reboot
   ```  
7. Boot from USB thumb drive into freshly installed Lion
8. Connect USB keyboard (only required for configuration after first boot)
9. Configure System

### Post-Installation Steps
1. Run Chameleon Installer
2. Set OS X system volume as destination
3. Run Updates
4. Restart

### Optional: RAM Update to 8 GB
> **Note:** The T410 doesn't support more than 1066 MHz clock speed!
> To be sure it will work, just take Apple certified Memory ([*CMSA8GX3M2A1066C7*](http://www.amazon.de/dp/B00505EZYW/ref=pe_386171_38075861_TE_item)).

### Done! :)
![lion-info](/files/thinkpad-t410-hackintosh/04-lion.png)

## Update: Mountain Lion
It is possible to install ***OS X 10.8.5 Mountain Lion*** over *Lion* without losing any data.

Repeat the steps from the Lion installation, ***BUT*** skip step 3.2.2 (Disk Utility)! Just select the Lion system volume as target for the installation.
After the installation, audio will not work, so replace the `AppleHDA.kext` with *[this one](/files/thinkpad-t410-hackintosh/AppleHDA.zip)* (using *Kext Wizard* and repairing permissions).

![mountain-lion-info](/files/thinkpad-t410-hackintosh/05-mountain-lion-info.png)

---
1. [http://www.insanelymac.com/forum/topic/274218-guide-lenovo-thinkpad-t510510i-plus-t410-and-w510-106-107-108-109-all-working-ok-20131112-update/](http://www.insanelymac.com/forum/topic/274218-guide-lenovo-thinkpad-t510510i-plus-t410-and-w510-106-107-108-109-all-working-ok-20131112-update/)
2. [http://www.insanelymac.com/forum/topic/280756-guide-the-all-in-one-guide-to-vanilla-os-x-including-chameleon-dsdt-for-beginners-updated-for-mavericks/](http://www.insanelymac.com/forum/topic/280756-guide-the-all-in-one-guide-to-vanilla-os-x-including-chameleon-dsdt-for-beginners-updated-for-mavericks/)

