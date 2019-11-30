---
layout: post
title: "Raspberry Pi Tor-over-Ethernet Dongle"
fav: 1
---

Usually, this kind of Transparent-Tor-Proxy setup is used as a [wireless access point](/transparent-tor-wlan-proxy-debian/) with the ethernet port of the Raspberry Pi being the gateway interface and the WLAN being the client-facing side. This is the exact opposite: the Raspberry Pi connects to the client computer with an ethernet cable and connects to the Tor network via WLAN. So it works like a wired dongle which automagically proxies all traffic through the Tor network.

Why? Because it's more secure: all the wireless traffic is encrypted Tor packets, the unencrypted packets are on the wire.


## Basic Setup
1. Download [Raspbian Lite](https://www.raspberrypi.org/downloads/raspbian/) and `dd` it to a SD-card.
2. Configure the wireless connection and enable SSH (see [here](/raspberry-pi-zero-w-headless-setup/)).
3. Connect to the Raspberry Pi via SSH.
4. Install required packages:
   ```bash
   export DEBIAN_FRONTEND=noninteractive

   apt update
   apt upgrade -y
   apt install -y vim curl apt-transport-https iptables-persistent udhcpd
   ```

## Network
1. Edit `/etc/dhcpcd.conf` to disable *dhcpcd* on *eth0*:
   ```
   denyinterfaces eth0
   ```
2. Edit `/etc/network/interfaces.d/eth0` to setup a static IP for *eth0*:
   ```
   auto eth0
   iface eth0 inet static
     address 10.0.0.254
     netmask 255.255.255.0
   ```
3. Restart the networking service:
   ```bash
   systemctl restart networking
   ```

## DHCP
The client setup should be zero-config, so the Raspberry Pi needs to provide DHCP to the client.

1. Edit `/etc/udhcpd.conf`:
   ```
   interface eth0
   start 10.0.0.100
   end 10.0.0.200
   remaining yes
   opt dns 10.0.0.254
   opt subnet 255.255.255.0
   opt router 10.0.0.254
   opt lease 7200
   ```
2. Enable `udhcpd` service:
   ```bash
   sed -i 's/^DHCPD_ENABLED/#DHCPD_ENABLED/' /etc/default/udhcpd
   systemctl enable --now udhcpd
   ```

## Tor
1. Add `/etc/apt/source.list.d/tor.list`:
   ```
   deb https://deb.torproject.org/torproject.org buster main
   deb-src https://deb.torproject.org/torproject.org buster main
   ```
2. Import signing key:
   ```bash
   curl https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --import
   gpg --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | apt-key add -
   ```
3. Install the `tor` package:
   ```bash
   apt update
   apt install -y tor deb.torproject.org-keyring
   ```
4. Edit `/etc/tor/torrc`:
   ```
   VirtualAddrNetworkIPv4 10.192.0.0/10
   AutomapHostsSuffixes .onion
   AutomapHostsOnResolve 1
   TransPort 10.0.0.254:9040
   DNSPort 10.0.0.254:5353
   ```
5. Restart service:
   ```bash
   systemctl restart tor
   ```

## NAT / iptables
This is where the magic happens:

1. All TCP traffic should be routed transparently through the Tor network:
   ```bash
   iptables -t nat -A PREROUTING -i eth0 -p tcp --syn -j REDIRECT --to-ports 9040
   ```
2. DNS is going to be answered by the local Tor DNS resolver:
   ```bash
   iptables -t nat -A PREROUTING -i eth0 -p udp --dport 53 -j REDIRECT --to-ports 5353
   ```
3. Save rules:
   ```
   iptables-save > /etc/iptables/rules.v4
   ```

---
