---
layout: post
title: "Replace LSI MegaRAID 9341-4i lsi_mr3 Driver with legacy megaraid Driver on VMware ESXi"
tags: [raid, vmware, esxi]
---

```bash
cd /tmp
wget http://download3.vmware.com/software/SCATEST/Avago_17/megaraid_sas-6.612.07.00-4692712.zip
unzip megaraid_sas-6.612.07.00-4692712.zip
esxcli software vib install -v="/tmp/scsi-megaraid-sas_6.612.07.00-1OEM.600.0.0.2494585.vib" --no-sig-check
esxcfg-module -d lsi_mr3
reboot

# Check if megaraid_sas driver is loaded after reboot:
esxcli storage core adapter list
```

---
1. [http://www.thevirtualist.org/replacing-driver-for-megaraid-sas-9361-8i-on-esxi-6/](http://www.thevirtualist.org/replacing-driver-for-megaraid-sas-9361-8i-on-esxi-6/)
2. [https://my.vmware.com/group/vmware/details?downloadGroup=DT-ESXI60-AVAGO-SCSI-MEGARAID-SAS-66120700-1OEM&productId=491](https://my.vmware.com/group/vmware/details?downloadGroup=DT-ESXI60-AVAGO-SCSI-MEGARAID-SAS-66120700-1OEM&productId=491)
