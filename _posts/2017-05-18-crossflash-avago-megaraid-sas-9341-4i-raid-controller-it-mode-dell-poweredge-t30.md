---
layout: post
title: "Crossflash Avago MegaRAID SAS 9341-4i RAID Controller with an IT-mode firmware on a Dell Poweredge T30"
tags: [raid, firmware, uefi]
---

> **Disclaimer:** This can kill RAID controllers!

I needed the [Avago MegaRAID SAS 9341-4i](https://www.broadcom.com/products/storage/raid-controllers/megaraid-sas-9341-4i) RAID controller to pretend being an HBA in a [Dell Poweredge T30](http://www.dell.com/en-us/work/shop/productdetails/poweredge-t30), because *VMWare ESXi 6.5* [doesn't support HDDs with 4K sectors](https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=2091600), like the *Seagate IronWolf 8TB* in this case. Using the RAID Controller as a fake HBA isn't solving the 4K sector problem, but it lets the harddrives present themselves as single disks to a *FreeNAS* VM in *ESXi* via *PCI Passthrough*, which was what I wanted to accomplish.

Since the *9341-4i* is kind of an upgraded *9300-4i* HBA card with a RAID controller on it, it needed to be *crossflashed* with an "*IT* mode" (initiator target) firmware for the *9300-4i*.

For several reasons, flashing the new firmware wasn't easy on the *Poweredge T30*. Using the `sas3flash` utility from within *ESXi* or *Windows* wasn't working. The only thing that worked was flashing from UEFI. If only the *T30* had a built-in UEFI shell... of course it doesn't (*rEFInd* to the rescue!).

Here is what I did to get the firmware flashed on the RAID controller:

1. Disconnect ALL drives.
2. Short-circuit the *TP12* pins on the RAID controller card with a jumper.
3. `dd` [rEFInd](https://sourceforge.net/projects/refind/files/0.10.7/refind-flashdrive-0.10.7.zip/download) image to USB flashdrive #1.
4. Get the UEFI Flash Utility (*Installer_P14_for_UEFI*) and the firmware package (*9300_4i_Package_P14_IR_IT_FW_BIOS_for_MSDOS_Windows*) from [Broadcom](https://www.broadcom.com/products/storage/host-bus-adapters/sas-9300-4i?pname=MGA-43728#downloads).
5. Put the following files to the root of FAT formatted USB flashdrive #2:
   - Installer_P14_for_UEFI/sas3flash_udk_uefi_x64_rel/**sas3flash.efi**
   - 9300_4i_Package_P14_IR_IT_FW_BIOS_for_MSDOS_Windows/Firmware/**SAS9300_4i_IT.bin**
6. Disconnect all drive connectors.
7. Connect both USB flashdrives.
8. Power on & boot from USB flashdrive #1 (*rEFInd*) into the EFI Shell.
9. Select USB flashdrive #2:
   ```
   fs0:
   ```
10. Run the UEFI Flash Utility to write the new Firmware to the RAID controller:
    ```
    sas3flash.efi -c 0 -f SAS9300_4i_IT.bin
    ```
11. Power off.
12. Reconnect all drives & remove jumper from the TP12 pins.
13. Power on & have fun!

---
1. [https://www.bussink.ch/?p=1489](https://www.bussink.ch/?p=1489)
2. [https://forums.servethehome.com/index.php?threads/crossflashing-of-lsi-9341-8i-to-lsi-9300-8i-success-but-no-smart-pass-through.3522/](https://forums.servethehome.com/index.php?threads/crossflashing-of-lsi-9341-8i-to-lsi-9300-8i-success-but-no-smart-pass-through.3522/)
