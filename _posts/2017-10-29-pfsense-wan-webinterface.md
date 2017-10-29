---
layout: post
title: "Access pfSense Webinterface from WAN"
tags: [pfsense,firewall,ssh]
---

When setting up **pfSense** without access to the LAN interface, there are several options to enable access to the webinterface.

### Disable the *packet filter* (pf)
In the *pfSense Console*  (Shell), enter `pfctl -d` to disable `pf`. This will only be temporarily, `pf` will be re-enabled everytime a change is made to the firewall rules in the pfSense GUI.

### Allow WAN access to port 443
Add a new firewall rule:
```bash
easyrule pass wan tcp any <WAN_IP> 443
```

### SSH 
1. In the *pfSense Console*, **Enable Secure Shell (sshd)**
2. Connect via SSH:
   ```bash
   ssh -L 4443:<LAN_IP>:443 root@<WAN:IP>
   ```
3. Browse to https://<LAN_IP>:4443

### Troubleshooting
If none of the above works, it might be possible that the WAN interface is connected to a private (RFC1918) network. This might be the case in a lab environment using VirtualBox, or for any other reason. The problem with that is, that pfSense blocks any private network (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) by default. 
To solve this problem, you need to disable the following setting in the webinterface (first run `pfctl -d` to disable the packet filter temporarily):
*Interfaces > WAN > Block private networks and loopback addresses* + hit `Apply Changes`.

---
