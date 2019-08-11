---
layout: post
title: "Linux Persistent Modprobe"
---

```bash
modprobe <$KERNEL_MODULE>
echo "<$KERNEL_MODULE>" | sudo tee -a /etc/modules
```

---
