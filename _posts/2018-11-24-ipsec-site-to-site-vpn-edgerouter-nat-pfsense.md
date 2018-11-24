---
layout: post
title: "IPsec Site-to-Site VPN between EdgeRouter X/Lite behind NAT and pfSense"
fav: 1
---

> **Note**: Only non-default values are listed below. For full configuration details see links in footer.

## pfSense
Go to *VPN* → *IPsec* → *Tunnels*.

### Add P1
#### General Information
- Remote Gateway: `0.0.0.0`
- Description: `EdgeRouter`

#### Phase 1 Proposal (Authentication)
- Peer identifier: `any`
- Pre-Shared Key: `<$SHARED_SECRET>`

#### Phase 1 Proposal (Encryption Algorithm)
- Hash: `SHA1`

### Add P2
#### General Information
- Remote Network: `<$EDGEROUTER_SUBNET>`

#### Phase 2 Proposal (SA/Key Exchange)
- Encryption Algorithms: `AES` - `128 bits`
- Hash Algorithms: `SHA1`

### Pre-Shared Keys
Go to *VPN* → *IPsec* → *Pre-Shared Keys*.

#### Add Pre-Shared Key
- Identifier: `any`
- Pre-Shared Key: `<$SHARED_SECRET>`

---

## EdgeRouter
Login via SSH and run `configure` to get to the configuration interface.

### IPsec Configuration:
```
set vpn ipsec esp-group ipsec
set vpn ipsec esp-group ipsec mode tunnel
set vpn ipsec esp-group ipsec pfs enable
set vpn ipsec esp-group ipsec proposal 1
set vpn ipsec esp-group ipsec proposal 1 encryption aes128
set vpn ipsec esp-group ipsec proposal 1 hash sha1
set vpn ipsec esp-group ipsec lifetime 86400
set vpn ipsec esp-group ipsec compression disable
set vpn ipsec ike-group ipsec dead-peer-detection action restart
set vpn ipsec ike-group ipsec dead-peer-detection interval 30
set vpn ipsec ike-group ipsec dead-peer-detection timeout 60
set vpn ipsec ike-group ipsec proposal 1
set vpn ipsec ike-group ipsec proposal 1 encryption aes128
set vpn ipsec ike-group ipsec proposal 1 hash sha1
set vpn ipsec ike-group ipsec lifetime 86400
set vpn ipsec ike-group ipsec key-exchange ikev1
set vpn ipsec ike-group ipsec proposal 1 dh-group 14
set vpn ipsec ipsec-interfaces interface eth0
set vpn ipsec auto-firewall-nat-exclude enable
set vpn ipsec nat-networks allowed-network 0.0.0.0/0
set vpn ipsec site-to-site peer <$PFSENSE_IP>
set vpn ipsec site-to-site peer <$PFSENSE_IP> description pfSense
set vpn ipsec site-to-site peer <$PFSENSE_IP> connection-type initiate
set vpn ipsec site-to-site peer <$PFSENSE_IP> authentication mode pre-shared-secret
set vpn ipsec site-to-site peer <$PFSENSE_IP> authentication pre-shared-secret <$SHARED_SECRET>
set vpn ipsec site-to-site peer <$PFSENSE_IP> ike-group ipsec
set vpn ipsec site-to-site peer <$PFSENSE_IP> local-address any
set vpn ipsec site-to-site peer <$PFSENSE_IP> tunnel 1
set vpn ipsec site-to-site peer <$PFSENSE_IP> tunnel 1 esp-group ipsec
set vpn ipsec site-to-site peer <$PFSENSE_IP> tunnel 1 local prefix <$EDGEROUTER_SUBNET>
set vpn ipsec site-to-site peer <$PFSENSE_IP> tunnel 1 remote prefix <$PFSENSE_SUBNET>
set vpn ipsec site-to-site peer <$PFSENSE_IP> tunnel 1 allow-nat-networks disable
set vpn ipsec site-to-site peer <$PFSENSE_IP> tunnel 1 allow-public-networks disable
```

After that, run `commit`, `save` & `exit`. The **ipsec** process will be started after that.
To check on the IPsec connection status run `sudo ipsec statusall`.

---
1. <https://help.ubnt.com/hc/en-us/articles/115012408087-EdgeRouter-Site-to-Site-IPsec-VPN-to-pfSense>
2. <https://futuristicsecurity.com/how-to-configure-site-to-site-ipsec-vpn-on-ubiquiti-edgerouter/>
3. <https://forum.netgate.com/topic/99550/site-to-site-ipsec-vpn-pfsense-to-ubiquiti-edgeos/2>
