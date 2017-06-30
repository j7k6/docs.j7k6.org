---
layout: post
title: "Fix Slow SSD Performance on VMWare ESXi 6.5.0"
tags: [fix, vmware, esxi, ssd]
---

```bash
esxcli system module set --enabled=false --module=vmw_ahci
```

---
