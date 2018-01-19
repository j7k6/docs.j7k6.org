---
layout: post
title: "Disable Swap File on Raspbian"
tags: [raspberry-pi,raspbian,linux,swap]
---

```bash
systemctl stop dphys-swapfile
systemctl disable dphys-swapfile
apt-get remove -y --purge dphys-swapfile
```

---
