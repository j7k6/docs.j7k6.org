---
layout: post
title: "Increase OpenVPN Performance"
tags: [openvpn,fix]
---

Add this to the *OpenVPN* **server** configuration:
```
sndbuf 393216
rcvbuf 393216
push "sndbuf 393216"
push "rcvbuf 393216"

tun-mtu 1400
mssfix 1360
```

---
1. [https://winaero.com/blog/speed-up-openvpn-and-get-faster-speed-over-its-channel/](https://winaero.com/blog/speed-up-openvpn-and-get-faster-speed-over-its-channel/)
