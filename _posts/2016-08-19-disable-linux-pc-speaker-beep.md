---
layout: post
title: "Disable Linux PC Speaker Beep"
tags: [linux, kernel, speaker]
---

### disable temporarily
```bash
rmmod pcspkr
```

### disable permanent
```bash
echo "blacklist pcspkr" > sudo tee /etc/modprobe.d/nobeep.conf
```

---
