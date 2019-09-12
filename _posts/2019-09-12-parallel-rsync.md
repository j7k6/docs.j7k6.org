---
layout: post
title: "Parallel Rsync"
---

```bash
cd <$SRC_DIR>
find . ! -type d -print0 | \
  xargs -0 -P<$THREADS> -n1 -I% \
  rsync -av % <$DEST_DIR>
cd -
```

---
1. <https://wiki.ncsa.illinois.edu/display/~wglick/2013/11/01/Parallel+Rsync>
