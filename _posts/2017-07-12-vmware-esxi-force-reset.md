---
layout: post
title: "Force VM Reset on ESXi"
tags: [vmware,esxi]
---

```bash
vim-cmd vmsvc/power.reset `vim-cmd vmsvc/getallvms | awk '/<$VM_NAME>/ {print $1}'`
```

---
