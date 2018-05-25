---
layout: post
title: "Remove Files Older than X Days"
tags: [linux,shell]
---

```bash
find <$DIRECTORY> -mtime +<$DAYS> -type f -delete
```

---
