---
layout: post
title: "'ip'-Command Cheat Sheet"
tags: [ip, linux, network]
---

```bash
# add default gateway
ip route add default via <$GATEWAY_IP>

# add static route
ip route add <$DST_NET> via <$GATEWAY_IP> dev <$DEV>

# show routing table
ip route show

# add ip address to device
ip addr add <$IP>/<$NETMASK> dev <$DEV>

# remove ip address from device
ip addr del <$IP>/<$NETMASK> dev <$DEV>

# enable interface
ip link set <$DEV> up

# disable interface
ip link set <$DEV> down
```

---
