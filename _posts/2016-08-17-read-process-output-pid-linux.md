---
layout: post
title: "Read Output from Process on Linux"
tags: [linux]
---

# stdout
```bash
tail -f /proc/$PID/fd/1
```

### stderr
```bash
tail -f /proc/$PID/fd/2
```

---
