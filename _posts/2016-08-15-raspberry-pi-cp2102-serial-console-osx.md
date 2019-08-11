---
layout: post
title: "Connect to Raspberry Pi with a CP2102 USB-to-Serial Adapter on OS X"
fav: 1
---

1. Download & install [OS X Driver](https://www.silabs.com/Support%20Documents/Software/Mac_OSX_VCP_Driver.zip).
2. On the *Raspbian* `boot` partition, add these lines to `config.txt` to enable UART:
   ```
   enable_uart=1
   dtoverlay=pi3-disable-bt
   ```

   > **Note**: To enable the serial console, Bluetooth will be disabled!
3. In `cmdline.txt` change `console=tty1` to `console=ttyAMA0`.
4. Connect [CP2102](https://www.amazon.de/gp/product/B00AFRXKFU) to Raspberry Pi CPIO pins (bottom right):
> ```
> . . . . . . . . . . . . . . . . . . .
> . . . . . . . . . . . . . . . . . . .
>                       Pin  10 8 6   2
>                             | | |   | 
>                            TXD|GND  5V
>                              RXD
> ```
5. Connect to serial console:
   ```bash
   screen /dev/tty.SLAB_USBtoUART 115200
   ```
6. Press `[ctrl+a]`, `k`, `y` to exit `screen`. 

---
