---
layout: post
title: "Delete Directories older than x Days"
tags: [shell,linux]
---

```bash
find <PATH>/* -type d -ctime +<DAYS> -exec rm -rf {} \;
```

---
