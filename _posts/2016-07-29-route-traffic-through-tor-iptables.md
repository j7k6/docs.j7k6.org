---
layout: post
title: "Route all Traffic through Tor for specific User on Linux with IPTables"
fav: 1
---

## Tor
Add those lines to `/etc/tor/torrc`:
```
Transport 9040
DNSPort 5353
```

## IPTables
```bash
iptables -A OUTPUT -p icmp -j REJECT
iptables -t nat -A OUTPUT ! -o lo -p tcp -m owner --uid-owner $USER -m tcp -j REDIRECT --to-ports 9040
iptables -t nat -A OUTPUT ! -o lo -p udp -m owner --uid-owner $USER -m udp --dport 53 -j REDIRECT --to-ports 5353
iptables -t filter -A OUTPUT -p tcp -m owner --uid-owner $USER -m tcp --dport 9040 -j ACCEPT
iptables -t filter -A OUTPUT -p udp -m owner --uid-owner $USER -m udp --dport 53 -j ACCEPT
iptables -t filter -A OUTPUT ! -o lo -m owner --uid-owner $USER -j DROP
```

---
