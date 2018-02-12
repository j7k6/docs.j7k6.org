---
layout: post
title: "Nmap over Tor"
tags: [security, tor, nmap, linux]
---

1. Install *proxychains* and *nmap*:
   ```bash
   apt-get install proxychains nmap
   ```
2. Configure *Proxychains* (edit `/etc/proxychains.conf`):
   ```
   ...
   [ProxyList]
   socks4 127.0.0.1 9050
   ```
3. Portscan:
   ```bash
   proxychains nmap -sT -PN -n -sV -p 22,80,443 <$TARGET_IP>
   ```

> *Note*: `tor` has to be running for this!


---
1. [https://www.shellhacks.com/anonymous-port-scanning-nmap-tor-proxychains/](https://www.shellhacks.com/anonymous-port-scanning-nmap-tor-proxychains/)
