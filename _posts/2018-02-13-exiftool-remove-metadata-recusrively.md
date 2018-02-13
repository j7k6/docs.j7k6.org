---
layout: post
title: "Remove All Metadata from All Images in a Directory Recursively with Exiftool"
tags: [exiftool,shell]
---

```bash
exiftool -creatortool= -software= -all= -overwrite_original -r .
```

---
