---
layout: post
title: "Disable Linux PC Speaker Beep"
---

## Disable Temporarily
```bash
rmmod pcspkr
```

## Disable Permanently
```bash
echo "blacklist pcspkr" > sudo tee /etc/modprobe.d/nobeep.conf
```

---
