---
layout: post
title: "Reset ESXi Evaluation License"
tags: [vmware,esxi]
---

> **Disclaimer**: Only for lab use!

```bash
rm -r /etc/vmware/license.cfg
cp /etc/vmware/.#license.cfg /etc/vmware/license.cfg
/etc/init.d/vpxa restart
```

---
