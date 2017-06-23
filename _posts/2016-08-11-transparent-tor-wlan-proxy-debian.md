---
layout: post
title: "Transparent Tor WLAN Proxy on Debian"
tags: [tor, wlan, proxy, debian]
---

1. Install packages:
```bash
apt-get update
apt-get install hostapd udhcpd tor iptables-persistent
```

2. Disable WLAN interface:
```bash
ifconfig wlan0 down
```

3. Edit `/etc/network/interfaces`:
```
allow hotplug wlan0
iface wlan0 inet static
  address 10.0.0.1
  netmask 255.255.255.0
```

4. Activate WLAN interface:
```bash
ifconfig wlan0 up
```

5. Edit `/etc/default/udhcpd`:
```
#DHCPD_ENABLED="no"
```

6. Edit `/etc/udhcpd.conf`:
```
start 10.0.0.100
end 10.0.0.200
interface wlan0
remaining yes
opt dns 8.8.8.8 8.8.4.4
opt subnet 255.255.255.0
opt router 10.0.0.1
opt lease 7200
```

7. Edit `/etc/default/hostapd`:
```
DAEMON_CONF="/etc/hostapd/hostapd.conf"
```

8. Edit `/etc/hostapd/hostapd.conf`
```
interface=wlan0
ssid=The Onion Router
hw_mode=g
channel=6
macaddr_acl=0
auth_algs=1
wmm_enabled=0
```

9. Edit `/etc/tor/torrc`:
```
Log notice file /var/log/tor/notices.log
VirtualAddrNetworkIPv4 10.192.0.0/10
AutomapHostsSuffixes .onion,.exit
AutomapHostsOnResolve 1
TransPort 9040
TransListenAddress 10.0.0.1
DNSPort 53
DNSListenAddress 10.0.0.1
```

10. IPTables:

```bash
iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 22 -j REDIRECT --to-ports 22
iptables -t nat -A PREROUTING -i wlan0 -p udp --dport 53 -j REDIRECT --to-ports 53
iptables -t nat -A PREROUTING -i wlan0 -p tcp --syn -j REDIRECT --to-ports 9040

iptables-save > /etc/iptables/rules.v4
```

```bash
reboot
```

---
1. [https://learn.adafruit.com/onion-pi/](https://learn.adafruit.com/onion-pi/)
2. [http://elinux.org/RPI-Wireless-Hotspot](http://elinux.org/RPI-Wireless-Hotspot)
