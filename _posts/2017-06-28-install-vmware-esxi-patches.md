---
layout: post
title: "Install VMWare ESXi Patches"
tags: [vmware, esxi]
---
  
1. Download Patch [here](https://my.vmware.com/group/vmware/patch) and `scp` it to datastore on ESXi host:
   ```bash
   scp ESXi650-201704001.zip root@<ESXi_HOST>:/vmfs/volumes/<DATASTORE>/
   ``` 
2. Install patch:
   ```bash
   esxcli software vib install -d "/vmfs/volumes/<DATASTORE>/ESXi650-201704001.zip"
   ```
3. Reboot

---
