---
layout: post
title: "Install StorCLI on ESXi"
tags: [storcli, raid, vmware, esxi]
---

```
wget https://docs.broadcom.com/docs-and-downloads/docs-and-downloads/raid-controllers/raid-controllers-common-files/1.19.04_StorCLI.zip

unzip 1.19.04_StorCLI.zip

esxcli software vib install -v 1.19.04_StorCLI/storcli_all_os/Vmware-MN/vmware-esx-storcli-1.19.04.vib --no-sig-check
```

---
1. [https://www.thomas-krenn.com/de/wiki/StorCLI_unter_VMware_vSphere_installieren#StorCLI_Installation_unter_ESXi_5.5_und_ESXi_6.0](https://www.thomas-krenn.com/de/wiki/StorCLI_unter_VMware_vSphere_installieren#StorCLI_Installation_unter_ESXi_5.5_und_ESXi_6.0)
