---
layout: post
title: "Check if CPU supports Hardware Virtualization on Linux"
tags: [linux, virtualization]
---

```bash
grep -E '(vmx|svm)' /proc/cpuinfo
```

---
