---
layout: post
title: "Check MTU with Ping / Manual Path MTU Discovery"
tags: [network, mtu, ping]
---

## Linux
```bash
ping -M do -s 1500 -c 1 <$HOST>
```

## macOS
```bash
ping -c 1 -D -s 1500 <$HOST>
```

## Windows
```bash
ping -n 1 -l 1500 -f <$HOST>
```

Decrease MTU on error (`Message too long`) to get the correct value.

---
1. [https://www.sonassi.com/help/magestack/setting-correct-mtu-for-openvpn](https://www.sonassi.com/help/magestack/setting-correct-mtu-for-openvpn)
2. [http://michael.stapelberg.de/Artikel/mtu_openvpn](http://michael.stapelberg.de/Artikel/mtu_openvpn)
3. [https://en.wikipedia.org/wiki/Path_MTU_Discovery](https://en.wikipedia.org/wiki/Path_MTU_Discovery)
