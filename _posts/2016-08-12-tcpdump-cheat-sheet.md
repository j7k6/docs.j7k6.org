---
layout: post
title: "TCPdump Cheat Sheet"
tags: [tcpdump]
---

### Write Capture to PCAP File
```bash
tcpdump -w <$FILE>.pcap
```

### Full Packet View in Hex
```bash
tcpdump -nnvvXSs 1514
```

### Traffic from and to $IP
```bash
tcpdump host <$IP>
```

### Traffic from $IP
```bash
tcpdump src <$IP>
```

### Traffic to $IP
```bash
tcpdump dst <$IP>
```

### Traffic from and to Network
```bash
tcpdump net <$NETWORK>/<$SUBNET>
```

### ICMP
```bash
tcpdump icmp
```

### Traffic to Port
```bash
tcpdump dst port <$PORT>
```

### Port Range
```bash
tcpdump portrange <$FROM_PORT>-<$TO_PORT>
```

---
1. [https://danielmiessler.com/study/tcpdump/](https://danielmiessler.com/study/tcpdump/)
