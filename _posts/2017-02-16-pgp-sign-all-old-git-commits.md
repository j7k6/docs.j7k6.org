---
layout: post
title: "PGP Sign all old Git Commits"
tags: [git, pgp]
---

```bash
git filter-branch -f --commit-filter 'git commit-tree -S "$@"' HEAD
```

---
1. [http://stackoverflow.com/a/27387391](http://stackoverflow.com/a/27387391)
