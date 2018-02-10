---
layout: post
title: "Install Adaptec RAID Controller (aacraid) Driver on VMware ESXi"
tags: [vmware,esxi,adaptec,raid,aacraid]
---

1. Download the **aacraid** driver package from [VMware](https://my.vmware.com/group/vmware/details?downloadGroup=DT-ESXI60-ADAPTEC-AACRAID-62152011&productId=491).
2. `unzip aacraid-6.0.6.2.1.54013-5685402.zip`
3. SCP the `vmware-esxi-drivers-scsi-aacraid-600.6.2.1.54013.-1.0.6.2494585.x86_64.vib` file to the ESXi system.
4. On ESXi, install the driver bundle:
   ```bash
   esxcli software acceptance set --level=CommunitySupported
   esxcli software vib install -v="/tmp/vmware-esxi-drivers-scsi-aacraid-600.6.2.1.54013.-1.0.6.2494585.x86_64.vib" --no-sig-check
   ```
5. Reboot ESXi.

---
