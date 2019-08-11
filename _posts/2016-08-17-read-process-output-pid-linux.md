---
layout: post
title: "Read Output from Process on Linux"
tags: [linux]
---

## Stdout
```bash
tail -f /proc/<$PID>/fd/1
```

## Stderr
```bash
tail -f /proc/<$PID>/fd/2
```

---
