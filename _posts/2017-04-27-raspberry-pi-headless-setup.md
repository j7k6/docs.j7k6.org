---
layout: post
title: "Raspberry Pi Headless Setup"
tags: [raspberry-pi, linux]
---

1. Install [*Raspbian*](https://www.raspberrypi.org/downloads/raspbian/) to SD
   card.
2. Create file `ssh` on *boot* partition:
   ```bash
   touch /Volumes/boot/ssh
   ```
3. Power-on Raspberry.
4. Connect Raspberry to Ethernet cable on DHCP enabled network.
5. Scan Network with `nmap` for Raspberry:
   ```bash
   sudo nmap -sP 192.168.1.0/24 | awk '/^Nmap/{ip=$NF}/B8:27:EB/{print ip}'
   ```
6. Connect to Raspberry via SSH (username: `pi`, password: `raspberry`).

---
1. [https://raspberrypi.stackexchange.com/a/13937](https://raspberrypi.stackexchange.com/a/13937)
2. [https://www.raspberrypi.org/documentation/remote-access/ssh/](https://www.raspberrypi.org/documentation/remote-access/ssh/)
