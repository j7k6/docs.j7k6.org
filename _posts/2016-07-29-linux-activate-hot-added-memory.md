---
layout: post
title: "Activate Hot-Added Memory in Linux"
tags: [ram, linux, vmware]
---

```bash
grep offline /sys/devices/system/memory/*/state | \
  cut -d: -f1 | \
  while read -r mem; do 
    echo online > "$mem";
  done
```

---
