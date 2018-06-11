---
layout: post
title: "Upgrade VMware ESXi 6.5.0 to 6.7.0"
tags: [vmware,esxi]
---

1. Shutdown all VM's:
   ```bash
   vim-cmd vmsvc/power.shutdown `vim-cmd vmsvc/getallvms | awk 'NR>1 {print $1}'`
   ```
2. Get release list:
   ```bash
   esxcli software sources profile list --depot=https://hostupdate.vmware.com/software/VUM/PRODUCTION/main/vmw-depot-index.xml | grep "6.7.0"
   ```
3. Install release:
   ```bash
   esxcli software profile update -f -d https://hostupdate.vmware.com/software/VUM/PRODUCTION/main/vmw-depot-index.xml -p ESXi-6.7.0-8169922-standard
   ```
4. Reboot *ESXi*.

---
