---
layout: post
title: "Force Transmission Bittorrent Client to use OpenVPN with IPTables"
tags: [transmission, bittorrent, openvpn, iptables, linux]
---

*/etc/openvpn/openvpn.conf*
```
...
route-nopull
up /etc/openvpn/up.sh
```

*/etc/openvpn/up.sh*
```bash
#!/bin/bash 
export INTERFACE="tun0" 
export VPNUSER="debian-transmission" 
export LANIP="192.168.1.0/24" 
export NETIF="eth0" 

iptables -F -t nat 
iptables -F -t mangle 
iptables -F -t filter 

# mark packets from $VPNUSER
iptables -t mangle -A OUTPUT ! --dest $LANIP  -m owner --uid-owner $VPNUSER -j MARK --set-mark 0x1 
iptables -t mangle -A OUTPUT --dest $LANIP -p udp --dport 53 -m owner --uid-owner $VPNUSER -j MARK --set-mark 0x1 
iptables -t mangle -A OUTPUT --dest $LANIP -p tcp --dport 53 -m owner --uid-owner $VPNUSER -j MARK --set-mark 0x1 
iptables -t mangle -A OUTPUT ! --src $LANIP -j MARK --set-mark 0x1

# allow responses
iptables -A INPUT -i $INTERFACE -m conntrack --ctstate ESTABLISHED -j ACCEPT

# allow bittorrent
iptables -A INPUT -i $INTERFACE -p tcp --dport 59560 -j ACCEPT
iptables -A INPUT -i $INTERFACE -p tcp --dport 6443 -j ACCEPT

iptables -A INPUT -i $INTERFACE -p udp --dport 8881 -j ACCEPT
iptables -A INPUT -i $INTERFACE -p udp --dport 7881 -j ACCEPT

# block everything incoming on $INTERFACE
iptables -A INPUT -i $INTERFACE -j REJECT

# send DNS to google for $VPNUSER
iptables -t nat -A OUTPUT --dest $LANIP -p udp --dport 53  -m owner --uid-owner $VPNUSER  -j DNAT --to-destination 8.8.4.4
iptables -t nat -A OUTPUT --dest $LANIP -p tcp --dport 53  -m owner --uid-owner $VPNUSER  -j DNAT --to-destination 8.8.8.8

# let $VPNUSER access lo and $INTERFACE
iptables -A OUTPUT -o lo -m owner --uid-owner $VPNUSER -j ACCEPT
iptables -A OUTPUT -o $INTERFACE -m owner --uid-owner $VPNUSER -j ACCEPT

# all packets on $INTERFACE needs to be masqueraded
iptables -t nat -A POSTROUTING -o $INTERFACE -j MASQUERADE

# reject connections from predator ip going over $NETIF
iptables -A OUTPUT ! --src $LANIP -o $NETIF -j REJECT

export GATEWAYIP=`ifconfig $VPNIF | egrep -o '([0-9]{1,3}\.){3}[0-9]{1,3}' | egrep -v '255|(127\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})' | tail -n1`
if [[ `ip rule list | grep -c 0x1` == 0 ]]; then
 ip rule add from all fwmark 0x1 lookup $VPNUSER
fi
ip route replace default via $GATEWAYIP table $VPNUSER
ip route append default via 127.0.0.1 dev lo table $VPNUSER
ip route flush cache
```

```bash
chmod +x /etc/openvpn/up.sh
```

*/etc/sysctl.d/9999-vpn.conf*
```
net.ipv4.conf.all.rp_filter = 0
net.ipv4.conf.default.rp_filter = 0
net.ipv4.conf.eth0.rp_filter = 0
```

```bash
sysctl -p
```

```bash
echo "200    debian-transmission" >> /etc/iproute2/rt_tables
```

```bash
service openvpn restart
```

---
1. [http://www.niftiestsoftware.com/2011/08/28/making-all-network-traffic-for-a-linux-user-use-a-specific-network-interface/](http://www.niftiestsoftware.com/2011/08/28/making-all-network-traffic-for-a-linux-user-use-a-specific-network-interface/)
