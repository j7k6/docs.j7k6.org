---
layout: post
title: "Remove All but x Newest Folders in Directory on Linux"
tags: [linux]
---

```bash
KEEP=5
rm -rf `ls -td <$PATH_TO_FILES>/*/ | tail -n +$(($KEEP+1))`
```

---
