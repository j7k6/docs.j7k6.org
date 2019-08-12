---
layout: post
title: "Linux & DVB-T: AVerMedia A850"
---

1. Install firmware:
   ```bash
   wget http://jusst.de/manu/fw/AFA/dvb-usb-af9015.fw_a-link
   sudo mv dvb-usb-af9015.fw_a-link /lib/firmware/dvb-usb-af9015.fw
   ```
2. Install `w_scan`:
   ```bash
   wget http://wirbel.htpc-forum.de/w_scan/w_scan-20130331.tar.bz2
   tar xvf w_scan-20130331.tar.bz2
   cd w_scan-20130331
   ./configure
   make && sudo make install
   ```
3. Scan channels:
   ```bash
   w_scan -ft -c BE -X -R N -O N >> ~/.mplayer/channels.conf
   ```
4. Play with `mplayer`:
   ```bash
   mplayer dvb://
   ```

---
