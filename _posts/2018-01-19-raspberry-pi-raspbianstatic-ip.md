---
layout: post
title: "Set Static IP in Raspbian"
tags: [raspberry-pi,raspbian,networking,linux,dhcp]
---

Since *Raspbian Jessie*, all IP configuration is done by the DHCP Client Daemon. So the old `/etc/network/interfaces` doesn't need to be touched anymore for configuring a static IP.
To set a static IP, edit the configuration in `/etc/dhcpcd.conf` and reboot afterwards:

```
interface eth0
static ip_address=10.0.0.10/24
static routers=10.0.0.1
static domain_name_servers=10.0.0.1
```

---
