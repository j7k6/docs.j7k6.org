---
layout: post
title: "Connect to the Internet via PPP with Sixfab GSM/GPRS Shield on Raspberry Pi"
tags: [raspberry-pi]
---

Sixfab's [**Raspberry Pi GSM GPRS Shield**](https://sixfab.com/product/gsmgprs-shield/) is a nice little IoT modem to connect the Pi to the internet in remote locations via a 2G mobile network.

## Serial Port Configuration
1. In `/boot/cmdline.txt` remove the `console=serial0,115200` part.
2. Add this lines to `/boot/config.txt`:
   ```
   enable_uart=1
   dtoverlay=pi3-disable-bt
   ```
3. Disable the *serial-getty* service:
   ```bash
   systemctl stop serial-getty@ttyAMA0.service
   systemctl disable serial-getty@ttyAMA0.service
   ```
4. Power-off the Pi.
5. Connect the *Sixfab GSM/GPRS Shield* to the Raspberry Pi's GPIO pins.
6. Make sure the physical switch on the Shield is set to **"Pi"** (not *USB*!)
7. Power-on the Pi.

## PPP
1. Install the `ppp` package:
   ```bash
   apt-get update
   apt-get install -y ppp
   ```
2. Create directories:
   ```bash
   mkdir -p /etc/chatscripts /etc/ppp/peers
   ```
3. Create `/etc/chatscripts/quectel-chat-connect` file:
   ```
   ABORT "BUSY"
   ABORT "NO CARRIER"
   ABORT "NO DIALTONE"
   ABORT "ERROR"
   ABORT "NO ANSWER"
   TIMEOUT 30
   "" AT
   OK ATE0
   OK ATI;+CSUB;+CSQ;+CPIN?;+COPS?;+CGREG?;&D2
   OK AT+CGDCONT=1,"IP","\T",,0,0
   OK ATD*99#
   CONNECT
   ```
4. Create `/etc/chatscripts/quectel-chat-disconnect` file:
   ```
   ABORT "ERROR"
   ABORT "NO DIALTONE"
   SAY "\nhangup...\n"
   +++
   +++
   +++
   SAY "\n...goodbye!\n"
   ```
5. Create `/etc/ppp/peers/gprs`
   ```
   /dev/ttyAMA0 115200
   connect 'chat -s -v -f /etc/chatscripts/quectel-chat-connect -T <$APN>'
   disconnect 'chat -s -v -f /etc/chatscripts/quectel-chat-disconnect'
   hide-password
   noauth
   debug
   defaultroute
   noipdefault
   novj
   novjccomp
   noccp
   ipcp-accept-local
   ipcp-accept-remote
   local
   lock
   modem
   dump
   nodetach
   nocrtscts
   remotename 3gppp
   ipparam 3gppp
   ipcp-max-failure 30
   usepeerdns
   ```

## Usage
1. To power-up the Shield using the GPIO's, use this Python script:
   ```python
   #!/usr/bin/env python
   
   import RPi.GPIO as GPIO
   import time
   
   GPIO.setmode(GPIO.BCM)
   GPIO.setup(26, GPIO.OUT)
   
   GPIO.output(26, True)
   time.sleep(2)
   GPIO.output(26, False)
   
   GPIO.cleanup()
   ```
2. Initiate GPRS call to connect to the internet:
   ```bash
   pppd call gprs &
   ```

### Optional
- Make the PPP connection the default route (optional):
  ```bash
  route del default
  route add default dev ppp0
  ```
- Disconnect the PPP connection:
  ```bash
  kill -9 `pidof pppd`
  ```

---
1. <https://sixfab.com/sending-sms-with-sixfab-gsmgprs-shield/>
2. <https://sixfab.com/updated-tutorial-2-make-a-ppp-internet-connection-with-sixfab-gprs-shield-on-raspberry-pi/>
