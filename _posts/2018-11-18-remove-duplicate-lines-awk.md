---
layout: post
title: "Remove Duplicate Lines in Files with AWK"
---

```bash
echo "$(awk '!seen[$0]++' file.txt)" > file.txt
```

---
