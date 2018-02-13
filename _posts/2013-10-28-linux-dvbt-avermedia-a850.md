---
layout: post
title: "Linux & DVB-T: AVerMedia A850"
tags: [linux,dvb-t,avermedia-a850]
---

## Firmware
```bash
wget http://jusst.de/manu/fw/AFA/dvb-usb-af9015.fw_a-link
sudo mv dvb-usb-af9015.fw_a-link /lib/firmware/dvb-usb-af9015.fw
```

## Scan Channels
1. Install `w_scan`:
   ```bash
   wget http://wirbel.htpc-forum.de/w_scan/w_scan-20130331.tar.bz2
   tar xvf w_scan-20130331.tar.bz2
   cd w_scan-20130331
   ./configure
   make && sudo make install
   ```
2. Perform scan:
   ```bash
   w_scan -ft -c BE -X -R N -O N >> ~/.mplayer/channels.conf
   ```

## Play with MPlayer
```bash
mplayer dvb://
```

---
