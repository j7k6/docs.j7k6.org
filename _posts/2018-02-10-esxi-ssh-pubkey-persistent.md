---
layout: post
title: "Enable Persistent SSH Public Key on VMware ESXi"
tags: [vmware,esxi,ssh]
---

1. Add *Public Key* to `authorized_keys` file on ESXi system:
   ```bash
   echo "<PUB_KEY>" >> /etc/ssh/keys-root/authorized_keys
   ```
2. Set *Sticky Bit* on file:
   ```bash
   chmod +t /etc/ssh/keys-root/authorized_keys
   ```
3. Make the `authorized_keys` file persistent:
   ```bash
   /sbin/auto-backup.sh
   ```

---
