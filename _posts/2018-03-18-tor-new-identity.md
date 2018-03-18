---
layout: post
title: "Force New Identity with Tor"
tags: [tor,netcat]
---

1. Enable *ControlPort* in `/etc/tor/torrc`:
   ```
   ControlPort 127.0.0.1:9051
   CookieAuthentication 0
   ```
2. Request new *Tor* identity:
   ```bash
   printf 'AUTHENTICATE\r\nSIGNAL NEWNYM\r\nQUIT\r\n' | nc 127.0.0.1 9051
   ```

---
