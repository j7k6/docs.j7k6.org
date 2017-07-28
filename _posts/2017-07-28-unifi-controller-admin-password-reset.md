---
layout: post
title: "Reset Unifi Controller Admin Password"
tags: [unifi-controller,password-reset,mongodb]
---

1. Find Admin User Name:
   ```bash
   mongo --port 27117 ace --eval "db.admin.find().forEach(printjson);"
   ```
2. Reset Password for Admin User:
   ```bash
   mongo --port 27117 ace --eval 'db.admin.update( { "name" : "<ADMIN_USER>" }, { $set : { "x_shadow" : "'`printf "<NEW_PASSWORD>" | mkpasswd -s -m sha-512`'" } } )'
   ```

---
1. [https://community.ubnt.com/t5/UniFi-Wireless/Controller-not-letting-me-change-admin-password/m-p/1560546#M160088](https://community.ubnt.com/t5/UniFi-Wireless/Controller-not-letting-me-change-admin-password/m-p/1560546#M160088)
