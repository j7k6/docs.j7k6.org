---
layout: post
title: "Remove ACLs recursively on FreeNAS"
---

```bash
find . -type d -print -exec setfacl -b {} \;
find . -type f -print -exec setfacl -b {} \;
```

---
