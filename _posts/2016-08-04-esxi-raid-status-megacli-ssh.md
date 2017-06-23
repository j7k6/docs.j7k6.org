---
layout: post
title: "Retrieve ESXi RAID Status from MegaCLI through SSH"
tags: [vmware, esxi, raid, ssh]
---

```bash
ssh root@$ESX_SERVER 'LD_LIBRARY_PATH=/opt/lsi/MegaCLI /opt/lsi/MegaCLI/MegaCli -CfgDsply -aALL' | \
  grep State | \
  head -n1 | \
  awk '{print $3}'
```

---
