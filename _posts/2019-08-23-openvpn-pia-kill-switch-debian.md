---
layout: post
title: "Private Internet Access OpenVPN Kill Switch on Debian Buster"
---

1. Setup OpenVPN for *PIA*, see [here](/debian-raspbian-openvpn-pia/).
2. Disable *IPv6*, see [here](/disable-ipv6-debian-ubuntu/).
3. Edit `/etc/resolv.conf`:
   ```
   nameserver 209.222.18.222
   nameserver 209.222.18.218
   ```
4. Make `/etc/resolv.conf` immutable:
   ```bash
   chattr +i /etc/resolv.conf
   ```
5. Add system group *openvpn*:
   ```bash
   groupadd -r openvpn
   ```
6. Add this line to `/etc/openvpn/pia.conf`:
   ```
   group openvpn
   ```
7. Set *iptables* rules:
   ```bash
   iptables -A OUTPUT -m owner --gid-owner openvpn -j ACCEPT
   iptables -A OUTPUT -o lo -j ACCEPT
   iptables -A OUTPUT -o tun+ -j ACCEPT
   iptables -A OUTPUT -p tcp -m state --state ESTABLISHED -j ACCEPT
   iptables -A OUTPUT -p udp --dport 1198 -j ACCEPT
   iptables -A OUTPUT -p udp -d 209.222.18.222,209.222.18.218 --dport 53 -j ACCEPT
   iptables -P OUTPUT DROP
   ```
8. Make *iptables* rules permanent:
   ```bash
   iptables-save > /etc/iptables/rules.v4
   ```
9. Restart *OpenVPN* service:
   ```bash
   systemctl restart openvpn@pia.service
   ```

---
