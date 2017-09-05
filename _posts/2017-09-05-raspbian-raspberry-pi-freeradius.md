---
layout: post
title: "Install FreeRADIUS on Raspberry Pi (Raspbian) for Active Directory Authentication"
tags: [raspberry-pi,raspbian,freeradius,samba,active-directory,security,linux]
---

## Prerequirements
1. Set nameservers to Windows Domain Controller (`/etc/resolv.conf`).
2. Install Packages:
   ```bash
   apt-get update
   apt-get install -y samba-common samba-dsdb-modules freeradius winbind
   ```
3. Winbindd Permission Fix:
   ```bash
   usermod -aG winbindd_priv freerad
   ```

## Samba
1. Edit `/etc/samba/smb.conf`:
   ```
   [global]
     netbios name = <COMPUTER_NAME> 
     workgroup = <NETBIOS_NAME>
     server string = RADIUS server
     security = ads
     invalid users = root
     socket options = TCP_NODELAY
     idmap uid = 16777216-33554431
     idmap gid = 16777216-33554431
     winbind use default domain = no
     winbind max domain connections = 5
     winbind max clients = 1000
     password server = *
     realm = <WINDOWS_DOMAIN>
   ```
3. Restart Service:
   ```bash
   systemctl restart winbind
   ```
2. Join Windows Domain:
   ```bash
   net ads join -U <DOMAIN_ADMIN>
   net ads testjoin
   ```

## FreeRADIUS
1. Edit `/etc/freeradius/3.0/mods-enabled/mschap`:
   ```
   mschap {
     ...
     winbind_username = "%{mschap:User-Name}"
     winbind_domain = "<WINDOWS_DOMAIN>"
     ... 
   }
   ```
2. Set `secret` in `/etc/freeradius/3.0/clients.conf`
3. Restart Service:
   ```bash
   systemctl restart freeradius
   ```
4. Test RADIUS with Active Directory Credentials:
   ```bash
   radtest -t mschap <USERNAME> <PASSWORD> 127.0.0.1 0 <RADIUS_CLIENT_SECRET>
   ```

---
1. [https://wiki.freeradius.org/guide/Active-Directory-direct-via-winbind](https://wiki.freeradius.org/guide/Active-Directory-direct-via-winbind)
