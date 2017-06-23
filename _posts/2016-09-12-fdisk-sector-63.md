---
layout: post
title: "Force Sector 63 Boundary in fdisk"
tags: [linux, fdisk, fix]
---

```bash
fdisk -c=dos -u=cylinders /dev/sdb
```

---
1. [http://confluence.wartungsfenster.de/display/Adminspace/fdisk+Force+sector+63+boundary](http://confluence.wartungsfenster.de/display/Adminspace/fdisk+Force+sector+63+boundary)
