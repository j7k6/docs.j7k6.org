---
layout: post
title: "Establish a GPRS Connection on a Raspberry Pi with a SimCom SIM900A and a Congstar SIM Card"
---

1. On *Raspbian OS* enable the serial interface with `raspi-config` and reboot.
2. Connect the *SIM900A* to the Raspberry Pi's GPIO pins for 5V power and UART.
3. Install `pppd`:
   ```bash
   apt update
   apt install ppp screen
   ```
4. The *SIM900A* runs on `9600` baud by default. To change the line speed to `115200` baud, connect to it on the serial line with `screen /dev/serial0 9600`.
   Now send this *AT* command to the modem:
   ```
   AT+IPR=115200
   ```
5. Disconnect from the serial terminal by pressing `CTRL` + `a` + `k` and confirm (`y`).
6. Create `/etc/pppd/peers/congstar`:
   ```
   /dev/serial0 115200
   connect 'chat -s -v -f /etc/chatscripts/gprs -T internet.telekom'
   noauth
   debug
   defaultroute
   replacedefaultroute
   nodetach
   usepeerdns
   ```
7. Connect to the internet:
   ```bash
   pppd call congstar
   ```

---
