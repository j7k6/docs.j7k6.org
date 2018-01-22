---
layout: post
title: "Delete Files from Git Repository after Creating .gitgnore"
tags: [git]
---

```bash
git rm -r --cached .
git add . --all
git commit -am "Ignore Files"
```

---
