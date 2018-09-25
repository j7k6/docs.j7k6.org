---
layout: post
title: "Establish PPP Network Connection on Raspberry Pi via Serial Console"
tags: [raspberry-pi, network, console, ppp, linux]
---

## Preparations

1. Download [*Raspbian*](https://www.raspberrypi.org/downloads/raspbian/) and install to SD card.
2. Download Debian packages:
    - [libpcap0.8_1.7.4-2_armhf.deb](http://mirrordirector.raspbian.org/raspbian/pool/main/libp/libpcap/libpcap0.8_1.7.4-2_armhf.deb)
    - [ppp_2.4.7-1+2_armhf.deb](http://mirrordirector.raspbian.org/raspbian/pool/main/p/ppp/ppp_2.4.7-1+2_armhf.deb)
3. Copy `*.deb` to SD cards boot partition.
4. Boot Raspberry Pi and connect to console: `screen /dev/ttyUSB0 115200`

## On Raspberry Pi

1. Install packages:
    ```bash
    dpkg -i /boot/libpcap0.8_*.deb
    dpkg -i /boot/ppp_*.deb
    ```
2. Remove `console=serial0,115200` from `/boot/cmdline.txt`.
3. Edit `/etc/rc.local`: 
    ```bash
    ...
    stty -F /dev/ttyAMA0 raw
    stty -F /dev/ttyAMA0 -a
    pppd /dev/ttyAMA0 115200 10.0.0.2:10.0.0.1 noauth local debug dump defaultroute nocrtscts persist maxfail 0 holdoff 1

    exit 0
    ```
4. Reboot

## On host

1. Run `pppd`:
```bash
stty -F /dev/ttyUSB0 raw
sudo pppd /dev/ttyUSB0 115200 10.0.0.1:10.0.0.2 proxyarp local noauth debug nodetach dump nocrtscts passive persist maxfail 0 holdoff 1 &
```
2. Enable Routing and NAT:
```bash
sudo sysctl -w net.ipv4.ip_forward=1
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```
3. Connect to Raspberry Pi via SSH: `ssh pi@10.0.0.2`
4. Download files from the Internet with *~12KB/s* like it's 1998.

---
1. [http://statusorel.ru/technology/connect-the-raspberry-pi-to-network-using-uart.html](http://statusorel.ru/technology/connect-the-raspberry-pi-to-network-using-uart.html)
