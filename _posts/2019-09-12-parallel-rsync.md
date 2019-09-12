---
layout: post
title: "Parallel Rsync"
---

```bash
find <$SRC_DIR> ! -type d -print0 | \
  xargs -0 -P<$THREADS> -n1 -I% \
  rsync -Rav % <$DEST_DIR>/
```

---
1. <https://wiki.ncsa.illinois.edu/display/~wglick/2013/11/01/Parallel+Rsync>
