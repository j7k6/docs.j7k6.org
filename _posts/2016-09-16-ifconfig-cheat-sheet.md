---
layout: post
title: "Ifconfig Cheat Sheet"
tags: [ifconfig, network, linux]
---

### Set static ip address
```bash
ifconfig eth0 $IP netmask $NETMASK broadcast $BROADCAST
```

### change mac address
```bash
ifconfig eth0 hw ether $MAC_ADDRESS
```

### add alias interface
```bash
ifconfig eth0:0 $ALIAS_IP
```

### enable promiscuous model
```bash
ifconfig eth0 promisc
```

---
