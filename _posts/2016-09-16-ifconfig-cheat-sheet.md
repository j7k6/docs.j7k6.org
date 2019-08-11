---
layout: post
title: "Ifconfig Cheat Sheet"
---

## Set Static IP Address
```bash
ifconfig eth0 <$IP> netmask <$NETMASK> broadcast <$BROADCAST>
```

## Change MAC Address
```bash
ifconfig eth0 hw ether <$MAC_ADDRESS>
```

## Add Alias Interface
```bash
ifconfig eth0:0 <$ALIAS_IP>
```

## Enable Promiscuous Mode
```bash
ifconfig eth0 promisc
```

---
