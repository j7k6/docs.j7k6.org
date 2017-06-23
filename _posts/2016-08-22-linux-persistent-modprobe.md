---
layout: post
title: "Linux Persistent Modprobe"
tags: [linux, kernel]
---

```bash
modprobe $KERNEL_MODULE
echo "$KERNEL_MODULE" | sudo tee -a /etc/modules
```

---
