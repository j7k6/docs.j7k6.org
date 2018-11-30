---
layout: post
title: "Allocate Empty File in Linux and macOS"
---

### Linux
```bash
fallocate -l 8G debian.img
```

### macOS
```bash
dd if=/dev/zero of=debian.img bs=1 count=0 seek=8g
```

---
