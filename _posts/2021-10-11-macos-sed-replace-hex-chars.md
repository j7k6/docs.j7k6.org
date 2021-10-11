---
layout: post
title: "Replace Hex Characters with sed on macOS"
---

Replace *A* (`\x41`) with *B* (`\x42`):

```bash
echo "AAAA" | sed "s/`printf '\x41'`/`printf '\x42'`/g"
```

---
