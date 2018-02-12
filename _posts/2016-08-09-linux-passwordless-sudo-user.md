---
layout: post
title: "Make User Passwordless Sudoer on Linux"
tags: [linux, sudo, password]
---

```bash
echo "<$USER> ALL=NOPASSWD:ALL" >> /etc/sudoers
```

---
