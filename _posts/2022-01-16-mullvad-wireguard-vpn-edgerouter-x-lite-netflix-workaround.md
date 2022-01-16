---
layout: post
title: Mullvad WireGuard VPN on EdgeRouter X/Lite with Netflix Workaround
fav: 1
---

This is an extension of [Mullvad WireGuard VPN on EdgeRouter X/Lite](/mullvad-wireguard-vpn-edgerouter-x-lite/).  
Since IP ranges from VPN providers are blocked by Netflix, there needs to be an routing exception for all Netflix traffic to bypass the VPN connection. The workaround is using the **dnsmasq** `ipset` feature to create a *network group* based on the IPs resolved to a Netflix domain from the list above.

1. DNS configuration:
   ```bash
   set service dhcp-server shared-network-name <$NETWORK_NAME> subnet <$LAN_SUBNET> dns-server <$ROUTER_LAN_IP>
   set service dns forwarding options ipset=/netflix.com/netflix.com/nflxvideo.net/NETFLIX
   commit
   ```
2. Firewall configuration:
   ```bash
   set firewall group address-group NETFLIX
   set firewall modify PBR rule 10 action accept
   set firewall modify PBR rule 10 destination group address-group NETFLIX
   commit
   ```
3. Persist config with `save`.

>**Note**: I successfully tested this workaround with Firefox on macOS.

---
