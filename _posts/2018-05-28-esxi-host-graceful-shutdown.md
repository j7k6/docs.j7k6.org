---
layout: post
title: "Shutdown ESXi Host Gracefully"
tags: [vmware-esxi]
---

1. Shutdown all running VMs:
   ```bash
vim-cmd vmsvc/power.shutdown `vim-cmd vmsvc/getallvms | awk 'NR>1 {print $1}'`
   ```
2. Enter *maintenance mode*:
   ```bash
esxcli system maintenanceMode set -e true -t 0
   ```
3. Shutdown ESXi:
   ```bash
esxcli system shutdown poweroff -d 10 -r "Graceful Shutdown"
   ```
4. Exit *maintenance mode*:
   ```bash
esxcli system maintenanceMode set -e false -t 0
   ```

---
1. <http://www.nojokeit.com/2012/11/graceful-shutdown-of-esxi-51-host-free.html>
