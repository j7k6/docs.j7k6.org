---
layout: post
title: "Create Swap File"
tags: [linux, swap]
---

```bash
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo "/swapfile   none    swap    sw    0   0" >> /etc/fstab
```

---
1. <https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04>
