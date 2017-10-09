---
layout: post
title: "Remove ACLs recursively on FreeNAS"
tags: [acl, freenas]
---

```bash
find . -type d -print -exec setfacl -b {} \;
find . -type f -print -exec setfacl -b {} \;
```

---
