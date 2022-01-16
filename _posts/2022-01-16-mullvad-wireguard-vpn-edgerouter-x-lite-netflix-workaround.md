---
layout: post
title: Mullvad WireGuard VPN on EdgeRouter X/Lite Netflix Bypass Workaround
fav: 1
---

> **Note**: This is an extension of [Mullvad WireGuard VPN on EdgeRouter X/Lite](/mullvad-wireguard-vpn-edgerouter-x-lite/).
> I successfully tested this workaround with Firefox on macOS and the Netflix AppleTV (3rd gen) app.  

> **Disclaimer**: Bypassing the VPN is undermining your privacy because you connect to Netflix with your real IP. Since Netflix uses AWS to deliver content, Amazon is also seeing connections from your real IP.

Since IP ranges from VPN providers are blocked by Netflix, there needs to be a routing exception for all Netflix traffic to bypass the VPN connection. The workaround is using the **dnsmasq** `ipset` feature to create a *network group* based on the IPs resolved to a Netflix domain from the list above.

1. DNS configuration:
   ```bash
   set service dhcp-server shared-network-name <$NETWORK_NAME> subnet <$LAN_SUBNET> dns-server <$ROUTER_LAN_IP>
   set service dns forwarding options ipset=/netflix.com/nflxvideo.net/NETFLIX
   commit
   ```
2. Add `NETFLIX` firewall address group:
   ```bash
   set firewall group address-group NETFLIX
   ```
3. Bulk-generate `address-group` commands for all IP ranges owned by Netflix (didn't work on the EdgeRouter shell, run this on your **local** machine)...
   ```bash
   for as in AS2906 AS40027 AS55095; do 
     for ip_range in $(whois -h whois.radb.net -- "-i origin ${as}" | grep -Eo "([0-9.]+){4}/[0-9]+" |uniq); do
       echo "set firewall group address-group NETFLIX address ${ip_range}";
     done;
   done
   ```
4. ...and copy the resulting `set firewall` commands and execute them on the EdgeRouter configuration shell (the IP ranges below could change in the future, so always generate them with the command in step 3 instead of just copying those):
   ```bash
   set firewall group address-group NETFLIX address 69.53.224.0/19
   set firewall group address-group NETFLIX address 208.75.76.0/22
   set firewall group address-group NETFLIX address 37.77.184.0/21
   set firewall group address-group NETFLIX address 208.75.76.0/24
   set firewall group address-group NETFLIX address 208.75.77.0/24
   set firewall group address-group NETFLIX address 208.75.78.0/24
   set firewall group address-group NETFLIX address 208.75.79.0/24
   set firewall group address-group NETFLIX address 108.175.32.0/20
   set firewall group address-group NETFLIX address 198.38.96.0/19
   set firewall group address-group NETFLIX address 198.45.48.0/20
   set firewall group address-group NETFLIX address 185.2.220.0/22
   set firewall group address-group NETFLIX address 185.2.220.0/24
   set firewall group address-group NETFLIX address 185.2.221.0/24
   set firewall group address-group NETFLIX address 192.173.64.0/18
   set firewall group address-group NETFLIX address 23.246.0.0/18
   set firewall group address-group NETFLIX address 185.9.188.0/22
   set firewall group address-group NETFLIX address 198.38.116.0/24
   set firewall group address-group NETFLIX address 198.38.117.0/24
   set firewall group address-group NETFLIX address 198.38.118.0/24
   set firewall group address-group NETFLIX address 198.38.119.0/24
   set firewall group address-group NETFLIX address 198.38.120.0/24
   set firewall group address-group NETFLIX address 198.38.121.0/24
   set firewall group address-group NETFLIX address 45.57.0.0/17
   set firewall group address-group NETFLIX address 64.120.128.0/17
   set firewall group address-group NETFLIX address 66.197.128.0/17
   set firewall group address-group NETFLIX address 23.246.20.0/24
   set firewall group address-group NETFLIX address 23.246.30.0/24
   set firewall group address-group NETFLIX address 23.246.31.0/24
   set firewall group address-group NETFLIX address 69.53.242.0/24
   set firewall group address-group NETFLIX address 45.57.16.0/24
   set firewall group address-group NETFLIX address 45.57.17.0/24
   set firewall group address-group NETFLIX address 45.57.74.0/24
   set firewall group address-group NETFLIX address 45.57.75.0/24
   set firewall group address-group NETFLIX address 23.246.50.0/24
   set firewall group address-group NETFLIX address 45.57.78.0/24
   set firewall group address-group NETFLIX address 45.57.79.0/24
   set firewall group address-group NETFLIX address 45.57.60.0/24
   set firewall group address-group NETFLIX address 37.77.186.0/24
   set firewall group address-group NETFLIX address 37.77.187.0/24
   set firewall group address-group NETFLIX address 23.246.55.0/24
   set firewall group address-group NETFLIX address 45.57.72.0/24
   set firewall group address-group NETFLIX address 45.57.73.0/24
   set firewall group address-group NETFLIX address 23.246.51.0/24
   set firewall group address-group NETFLIX address 45.57.51.0/24
   set firewall group address-group NETFLIX address 45.57.50.0/24
   set firewall group address-group NETFLIX address 37.77.184.0/23
   set firewall group address-group NETFLIX address 37.77.186.0/23
   set firewall group address-group NETFLIX address 37.77.188.0/23
   set firewall group address-group NETFLIX address 23.246.15.0/24
   set firewall group address-group NETFLIX address 23.246.28.0/24
   set firewall group address-group NETFLIX address 23.246.29.0/24
   set firewall group address-group NETFLIX address 23.246.55.0/24
   set firewall group address-group NETFLIX address 108.175.47.0/24
   set firewall group address-group NETFLIX address 23.246.52.0/24
   set firewall group address-group NETFLIX address 45.57.8.0/23
   set firewall group address-group NETFLIX address 45.57.8.0/24
   set firewall group address-group NETFLIX address 45.57.9.0/24
   set firewall group address-group NETFLIX address 45.57.40.0/24
   set firewall group address-group NETFLIX address 45.57.76.0/24
   set firewall group address-group NETFLIX address 45.57.77.0/24
   set firewall group address-group NETFLIX address 45.57.76.0/23
   set firewall group address-group NETFLIX address 45.57.40.0/23
   set firewall group address-group NETFLIX address 45.57.41.0/24
   set firewall group address-group NETFLIX address 45.57.86.0/23
   set firewall group address-group NETFLIX address 45.57.86.0/24
   set firewall group address-group NETFLIX address 45.57.87.0/24
   set firewall group address-group NETFLIX address 45.57.90.0/24
   set firewall group address-group NETFLIX address 45.57.91.0/24
   set firewall group address-group NETFLIX address 45.57.90.0/23
   set firewall group address-group NETFLIX address 45.57.0.0/17
   set firewall group address-group NETFLIX address 69.53.250.0/24
   set firewall group address-group NETFLIX address 69.53.254.0/24
   set firewall group address-group NETFLIX address 69.53.229.0/24
   set firewall group address-group NETFLIX address 69.53.228.0/24
   set firewall group address-group NETFLIX address 69.53.253.0/24
   set firewall group address-group NETFLIX address 208.75.76.0/22
   set firewall group address-group NETFLIX address 69.53.224.0/19
   set firewall group address-group NETFLIX address 38.72.126.0/24
   set firewall group address-group NETFLIX address 69.53.242.0/24
   set firewall group address-group NETFLIX address 192.173.64.0/18
   set firewall group address-group NETFLIX address 69.53.242.0/24
   commit
   ```
5. Add *PBR* rule to firewall:
   ```bash
   set firewall modify PBR rule 10 action accept
   set firewall modify PBR rule 10 destination group address-group NETFLIX
   commit
   ```
6. Persist config with `save`.

---
1. <https://gist.github.com/frk1/8fb578b36bd9a36a48109f412c844a1f>
