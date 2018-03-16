---
layout: post
title: "Raspberry Pi Zero W Headless Setup"
tags: [raspberry-pi]
---

Since the **Raspberry Pi Zero W** doesn't has an ethernet port to automatically get an IP via DHCP, it needs to be preconfigured to join a wireless network.
After `dd`-ing the *Raspbian* Image to the SD-card, create a `wpa_supplicant.conf` file on the the *boot* partition:

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
  ssid="<$WLAN_NAME>"
  psk="<$WLAN_PASSWORD>"
}
```

To enable SSH, create the empty  `ssh` file on the *boot* partition.

---
