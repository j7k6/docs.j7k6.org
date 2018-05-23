---
layout: post
title: "Find Largest Directories on Linux System"
tags: [linux,shell]
---

```bash
du -a / 2>/dev/null | sort -nr | head -n10
```

---
