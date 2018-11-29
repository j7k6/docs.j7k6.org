---
layout: post
title: "StrongSwan IPsec Transport Mode Connection between 2 Ubuntu Servers"
fav: 1
---

The configuration is exactly the same on both servers.

1. Install **strongSwan**:
   ```bash
   apt-get update
   apt-get install -y strongswan
   ```
2. Add shared secret to `/etc/ipsec.secrets`:
   ```
   <$NODE1_IP> <$NODE2_IP> : PSK "<$SHARED_SECRET>"
   ```
3. Add connection configuration to `/etc/ipsec.conf`:
   ```
   conn <$CONNECTION_NAME>
     type=transport
     authby=secret
     left=<$NODE1_IP>
     right=<$NODE2_IP>
     pfs=yes
     auto=start
   ```
4. Enable & start service:
   ```bash
   systemctl enable --now strongswan
   ```
5. Check connection status:
   ```bash
   ipsec statusall
   ```

---
1. <https://blog.sprinternet.at/2016/03/ipsec-transport-mode-with-strongswan-on-debian-jessie/>
