---
layout: post
title: "Allow Outgoing TCP Connections in Hetzner Firewall"
tags: [hetzner,firewall]
---

When the *Firewall* is enabled in Hetzner Robot, outgoing TCP connections won't work until they are explicitly allowed by this rule:

- Name: `TCP_Out`
- Source IP: `0.0.0.0/0`
- Destination IP: `0.0.0.0/0`
- Destination port: `32768-65535`
- Protocol: `tcp`
- TCP flags: `ack`
- Action: `accept`

![hetzner-firewall-outgoing-tcp](/files/hetzner-firewall-outgoing-tcp.png)

---
1. [https://wiki.hetzner.de/index.php/Robot_Firewall/en#Out-going_TCP_connections](https://wiki.hetzner.de/index.php/Robot_Firewall/en#Out-going_TCP_connections)
