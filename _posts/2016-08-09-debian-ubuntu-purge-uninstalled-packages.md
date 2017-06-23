---
layout: post
title: "Purge Uninstalled Packages in Debian/Ubuntu"
tags: [debian, ubuntu, linux]
---

```bash
dpkg -l | awk '/^rc/ {print $2}' | xargs dpkg --purge
```

---
1. [https://ascending.wordpress.com/2007/04/10/apt-tip-purge-removed-packages/](https://ascending.wordpress.com/2007/04/10/apt-tip-purge-removed-packages/)
