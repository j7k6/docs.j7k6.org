2018-05-22-ubiquity-edgerouter-lite-x-basic-setup.md
---
layout: post
title: "EdgeRouter Lite/X Basic Setup"
tags: [ubiquity,edgerouter-lite,edgerouter-x,nat,firewall,dhcp,dns,router,edgeos]
---

This coveres a basic  *Ubiquity* ***EdgeRouter Lite/X*** setup with a WAN connection on `eth0` and a LAN site on `eth1`, including *Firewall*, *NAT*, *DHCP* & *DNS*.

A brand new *EdgeRouter* can be accessed on it's `eth0` interface on the default IP address `192.168.1.1`. To do the basic configuration, connect to it via SSH (default username/password: `ubnt`/`ubnt`). Type `configure` to enter configuration mode.

---

## Firewall
### Basic rules
```
set firewall all-ping enable
set firewall broadcast-ping disable
set firewall ipv6-receive-redirects disable
set firewall ipv6-src-route disable
set firewall ip-src-route disable
set firewall log-martians enable
set firewall receive-redirects disable
set firewall send-redirects enable
set firewall source-validation disable
set firewall syn-cookies enable
```

### Incoming WAN rules
```
set firewall name WAN_IN default-action drop
set firewall name WAN_IN enable-default-log
set firewall name WAN_IN rule 1 action accept
set firewall name WAN_IN rule 1 description "Allow established connections"
set firewall name WAN_IN rule 1 state established enable
set firewall name WAN_IN rule 1 state related enable
set firewall name WAN_IN rule 2 action drop
set firewall name WAN_IN rule 2 log enable
set firewall name WAN_IN rule 2 description "Drop invalid state"
set firewall name WAN_IN rule 2 state invalid enable
```

### WAN to LAN rules
```
set firewall name WAN_LOCAL default-action drop
set firewall name WAN_LOCAL enable-default-log
set firewall name WAN_LOCAL rule 1 action accept
set firewall name WAN_LOCAL rule 1 description "Allow established connections"
set firewall name WAN_LOCAL rule 1 state established enable
set firewall name WAN_LOCAL rule 1 state related enable
set firewall name WAN_LOCAL rule 2 action drop
set firewall name WAN_LOCAL rule 2 log enable
set firewall name WAN_LOCAL rule 2 description "Drop invalid state"
set firewall name WAN_LOCAL rule 2 state invalid enable
```

---

## Interfaces
### WAN Interface
The WAN interface will get its IP from an external DHCP (cable modem or so):
```
set interfaces ethernet eth0 description WAN
set interfaces ethernet eth0 address dhcp
set interfaces ethernet eth0 dhcp-options name-server no-update
set interfaces ethernet eth0 firewall in name WAN_IN
set interfaces ethernet eth0 firewall local name WAN_LOCAL
```

### LAN Interface
```
set interfaces ethernet eth1 description LAN1
set interfaces ethernet eth1 address 192.168.1.254/24
```

---

## NAT
The outgoing traffic from the LAN interface needs to be masqueraded (Source-NAT):
```
set service nat rule 5010 description "Masquerade for WAN"
set service nat rule 5010 outbound-interface eth0
set service nat rule 5010 type masquerade
```

---

## DHCP
```
set service dhcp-server disabled false
set service dhcp-server shared-network-name LAN1 authoritative enable
set service dhcp-server shared-network-name LAN1 subnet 192.168.1.0/24 default-router 192.168.1.254
set service dhcp-server shared-network-name LAN1 subnet 192.168.1.0/24 dns-server 192.168.1.254
set service dhcp-server shared-network-name LAN1 subnet 192.168.1.0/24 lease 86400
set service dhcp-server shared-network-name LAN1 subnet 192.168.1.0/24 start 192.168.1.100 stop 192.168.1.200
```

---

## DNS
Use `dnsmasq` as DNS forwarder:
```
set system name-server 127.0.0.1
set service dns forwarding options strict-order
set service dns forwarding name-server 1.1.1.1
set service dns forwarding name-server 8.8.8.8
set service dns forwarding listen-on eth1
```

---

To finish the basic setup, run those commands:

```
commit
save
exit
```

---
1. [https://loganmarchione.com/2016/04/ubiquiti-edgerouter-lite-setup/](https://loganmarchione.com/2016/04/ubiquiti-edgerouter-lite-setup/)
