---
layout: post
title: "EdgeRouter Lite/X L2TP VPN with RADIUS Authentication"
tags: [vpn,l2tp,edgerouter,radius]
---

1. Get terminal on EdgeRouter (SSH or Web-CLI).
2. Type `configure` to enter Configuration Mode.
3. Configure **L2TP**:
   ```
   set vpn ipsec ipsec-interfaces interface eth0
   
   set vpn l2tp remote-access ipsec-settings authentication mode pre-shared-secret
   set vpn l2tp remote-access ipsec-settings authentication pre-shared-secret <PRE_SHARED_SECRET>

   set vpn l2tp remote-access client-ip-pool start <START_ADDRESS>
   set vpn l2tp remote-access client-ip-pool stop <END_ADDRESS>

   set vpn l2tp remote-access dns-servers server-1 <DNS1>
   set vpn l2tp remote-access dns-servers server-2 <DNS2>

   set vpn l2tp remote-access outside-address <WAN_ADDRESS>

   set vpn l2tp remote-access authentication mode radius
   set vpn l2tp remote-access authentication radius-server <RADIUS_IP> key <RADIUS_KEY>
   ```
4. Configure **Firewall**:
   ```
   set firewall name WAN_LOCAL rule 30 action accept
   set firewall name WAN_LOCAL rule 30 description IKE
   set firewall name WAN_LOCAL rule 30 destination port 500
   set firewall name WAN_LOCAL rule 30 log disable
   set firewall name WAN_LOCAL rule 30 protocol udp

   set firewall name WAN_LOCAL rule 40 action accept
   set firewall name WAN_LOCAL rule 40 description L2TP
   set firewall name WAN_LOCAL rule 40 destination port 1701
   set firewall name WAN_LOCAL rule 40 log disable
   set firewall name WAN_LOCAL rule 40 protocol udp

   set firewall name WAN_LOCAL rule 50 action accept
   set firewall name WAN_LOCAL rule 50 description ESP
   set firewall name WAN_LOCAL rule 50 log disable
   set firewall name WAN_LOCAL rule 50 protocol esp

   set firewall name WAN_LOCAL rule 60 action accept
   set firewall name WAN_LOCAL rule 60 description NAT-T
   set firewall name WAN_LOCAL rule 60 destination port 4500
   set firewall name WAN_LOCAL rule 60 log disable
   set firewall name WAN_LOCAL rule 60 protocol udp
   ```
5. Commit & Save changes:
   ```
   commit
   save
   exit
   ```

---
1. [https://help.ubnt.com/hc/en-us/articles/115010359067-EdgeRouter-IPsec-L2TP-Server-using-RADIUS](https://help.ubnt.com/hc/en-us/articles/115010359067-EdgeRouter-IPsec-L2TP-Server-using-RADIUS)
