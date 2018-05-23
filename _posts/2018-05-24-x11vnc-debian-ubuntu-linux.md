---
layout: post
title: "X11VNC on Debian/Ubuntu"
tags: [xorg,vnc,x11vnc,debian,ubuntu,linux]
---

1. Update & install packages:
   ```bash
apt-get update && apt-get install -y x11vnc
   ```
2. Store VNC password:
   ```bash
x11vnc -storepasswd /etc/x11vnc.passwd
chmod 0400 /etc/x11vnc.passwd
   ```
3. Edit `/lib/systemd/system/x11vnc.service`:
   ```
   [Unit]
   Description=Start x11vnc
   After=multi-user.target

   [Service]
   Type=simple
   ExecStart=/usr/bin/x11vnc -display :0 -auth guess -forever -loop -noxdamage -repeat -rfbauth /etc/x11vnc.passwd -rfbport 5900 -shared

   [Install]
   WantedBy=multi-user.target
   ```
4. Enable & start `x11vnc` service:
   ```bash
systemctl enable x11vnc.service
systemctl start x11vnc.service
   ```

---
1. [https://www.elektronik-kompendium.de/sites/raspberry-pi/2011121.htm](https://www.elektronik-kompendium.de/sites/raspberry-pi/2011121.htm)
