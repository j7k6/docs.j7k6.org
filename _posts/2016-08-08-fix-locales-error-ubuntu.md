---
layout: post
title: "Fix Locales Error in Ubuntu"
tags: [fix, ubuntu, linux, locale]
---

```bash
cat > /etc/default/locale << EOF
LC_ALL=en_US.UTF-8
LANG=en_US.UTF-8
EOF
```

---
1. [http://askubuntu.com/a/229512](http://askubuntu.com/a/229512)
