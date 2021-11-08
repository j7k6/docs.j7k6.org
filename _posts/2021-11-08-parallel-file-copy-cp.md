---
layout: post
title: "Parallel File Copy (cp)"
---


1. Create destination directory:
   ```bash
   mkdir -p <$DEST_DIR>
   ```
2. Go to source directory:
   ```bash
   cd <$SRC_DIR>
   ```
3. Copy files:
   ```bash
   find . ! -type d -print0 | \
     xargs -0 -P<$NUM_PROCS> -n1 -I % \
     cp -avn --parents % <$DEST_DIR>/
   ```

---
