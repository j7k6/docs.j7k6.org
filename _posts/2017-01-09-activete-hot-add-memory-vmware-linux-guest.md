---
layout: post
title: "Activate Hot-Added Memory on VMWare Linux Guest"
tags: [vmware, linux, ram]
---

```bash
for mem in ls /sys/devices/system/memory/memory*/state; 
  do echo "online" > $mem; 
done 2>/dev/null;
```

---
1. [https://blog.teamix.de/2014/12/06/vmware-vsphere-hot-add-does-not-work-tips-tricks/](https://blog.teamix.de/2014/12/06/vmware-vsphere-hot-add-does-not-work-tips-tricks/)
