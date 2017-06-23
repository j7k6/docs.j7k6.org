---
layout: post
title: "Fix Mobile Shell (mosh) UTF-8 Connection Problem on OS X with ZSH"
tags: [mosh, utf-8, zsh, fix, macos]
---

```bash
cat >> ~/.zshrc << EOF
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
EOF
```

---
