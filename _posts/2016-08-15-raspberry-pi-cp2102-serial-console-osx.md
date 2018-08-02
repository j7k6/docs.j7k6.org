---
layout: post
title: "Connect to Raspberry Pi with a CP2102 USB-to-Serial Adapter on OS X"
tags: [raspberry-pi, usb, console, macos, uart, cp2102]
---

1. Download & install [OS X Driver](https://www.silabs.com/Support%20Documents/Software/Mac_OSX_VCP_Driver.zip).
2. Connect [CP2102](https://www.amazon.de/gp/product/B00AFRXKFU) to Raspberry Pi CPIO pins (bottom right):
> ```
> . . . . . . . . . . . . . . . . . . .
> . . . . . . . . . . . . . . . . . . .
>                       Pin  10 8 6   2
>                             | | |   | 
>                            TXD|GND  5V
>                              RXD
> ```
3. Connect to serial console:
   ```bash
   screen /dev/tty.SLAB_USBtoUART 115200
   ```
4. Press `[ctrl+a]`, `k`, `y` to exit `screen`. 

---
