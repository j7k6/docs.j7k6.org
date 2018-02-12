---
layout: post
title: "Transfer Files through SSH with Tar"
tags: [tar, ssh]
---

```bash
tar czhf - <$SRC_DIR> | \
  ssh <$SSH_USER>@<$SSH_HOST> \
    "tar xzhf - -C <$DST_DIR>"
```

---
