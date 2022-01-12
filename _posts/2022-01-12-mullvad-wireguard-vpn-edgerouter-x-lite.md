---
layout: post
title: Mullvad WireGuard VPN on EdgeRouter X/Lite
fav: 1
---

1. Go to <https://mullvad.net/en/account/#/wireguard-config/> to generate a WireGuard config (`Linux -> Generate Key -> Copy Public Key -> Download file`).
2. Install WireGuard on EdgeRouter:
   ```bash
   sudo su
   cd /tmp
   curl -fsSLO https://github.com/WireGuard/wireguard-vyatta-ubnt/releases/download/1.0.20211208-1/e50-v2-v1.0.20211208-v1.0.20210914.deb
   dpkg -i e50-v2-v1.0.20211208-v1.0.20210914.deb
   exit
   ```
3. Enter `configure` mode.
4. Configure Mullvad WireGuard connection with the values from the previously generated config file from Mullvad:
   ```bash
   set interfaces wireguard wg0 address <$INTERFACE_ADDRESS>/32
   set interfaces wireguard wg0 peer "<$PUBLIC_KEY>" allowed-ips 0.0.0.0/0
   set interfaces wireguard wg0 peer "<$PUBLIC_KEY>" endpoint "<$PEER_IP>:51820"
   set interfaces wireguard wg0 private-key "<$PRIVATE_KEY>"
   set interfaces wireguard wg0 route-allowed-ips false
   commit
   ```
5. Configure NAT:
   ```bash
   set service nat rule 5000 outbound-interface wg0
   set service nat rule 5000 outside-address address <$INTERFACE_ADDRESS>
   set service nat rule 5000 type source
   commit
   ```
6. Configure Killswitch:
   ```bash
   set protocols static table 1 interface-route 0.0.0.0/0 next-hop-interface wg0
   set protocols static table 1 route 0.0.0.0/0 blackhole distance 255
   commit
   ```
7. Configure *Policy-Based Routing*:
   ```bash
   set firewall modify PBR rule 100 action modify
   set firewall modify PBR rule 100 modify table 1
   set firewall modify PBR rule 100 source address <$LOCAL_NETWORK>
   set interfaces ethernet <$LAN_INTERFACE> firewall in modify PBR
   commit
   ```
8. Persist config with `save`.

---
1. <https://github.com/WireGuard/wireguard-vyatta-ubnt/>
2. <https://andrew.dunn.dev/posts/wireguard-from-your-isp/>
