---
layout: post
title: "Monitor Adaptec RAID Controller on VMware ESXi"
tags: [vmware,esxi,adaptec,raid,monitoring]
---

1. Download the **maxView Storage Manager** from [Microsemi](https://storage.microsemi.com/de-de/speed/raid/storage_manager/msm_vmware_v1_08_21375_zip.php).
2. `unzip msm_vmware_v1_08_21375.zip`
3. SCP the `cim/esxi6_0/cim/vmware-esx-provider-arc*.vib` files to the ESXi system.
4. On ESXi, install the driver bundle:
   ```bash
   esxcli software vib install -v="/tmp/vmware-esx-provider-arcconf.vib" --no-sig-check
   esxcli software vib install -v="/tmp/vmware-esx-provider-arc-cim-provider.vib" --no-sig-check
   ```
5. Reboot ESXi.

In *vSphere*, navigate to *Monitor* > *Hardware* > *Storage* to view the RAID Controller's status:
![vmware-esxi-adapted-raid-monitor.png](/files/vmware-esxi-adapted-raid-monitor.png)

---
