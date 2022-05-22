---
layout: post
title: "Flash SimCom SIM900A Firmware"
fav: 1
---

Appearantly, the "**A**" in *SimCom's SIM900**A*** GPRS/GSM Modem Module stands for "*Asia*", which means it's not usable in mobile networks outside of Asia, but it's possible to flash a different firmware to make it work globally.

## Requirements
- Windows PC (or VM)
- USB to UART Bridge (tested with *CP2101*)
- *SIM900 Custom Flash Loader v1.01* (download [here](https://web.archive.org/web/20170717062236/http://www.geekonfire.com/wiki/images/b/b8/Simcom_-_sim900_Customer_flash_loader_V1.01.rar))
- SIM900 *ENHANCED* Firmware (download [here](https://simcom.ee/documents/SIM900/1137B06SIM900M64_ST_ENHANCE.RAR))
- *PuTTY*

## Flashing the Firmware
1. Connect the SIM900A Module to the USB UART Bridge
2. Open Windows Device Manager to find the UART Bridge's serial port number (e.g. *COM3*):
   ![Windows Device Manager](/files/simcom-sim900a-firmware-flash/01.png)
3. Run *PuTTY* to establish a serial connection to the SIM900A:
   ![PuTTY](/files/simcom-sim900a-firmware-flash/02.png)
4. Set the SIM900A's fixed baudrate to 19200 by sending the `AT` command followed by the `AT+IPR=19200` to the modem:
   ![PuTTY](/files/simcom-sim900a-firmware-flash/03.png)
5. Quit *PuTTY* to close the serial line.
6. Run the *SIM900 Custom Flash Loader*  tool and select the firmware file, the appropriate *COM Port* and set the line speed to `19200` baud.
7. Press *START* and restart the SIM900A (power off & on again). This starts the flashing process. The flashing process can take up to 30 minutes:
   ![Flashing Firmware](/files/simcom-sim900a-firmware-flash/04.png)





---
1. <https://www.mikrocontroller.net/articles/Sim900#Firmware_Flashen>
2. <https://simcom.ee/documents/?dir=SIM900>
4. <https://web.archive.org/web/20161130132417/http://www.geekonfire.com/wiki/index.php?title=GPRS_Shield%EF%BC%88SIM900%EF%BC%89_Firmware_Update>
