---
layout: post
title: "Fix Mobile Shell (mosh) UTF-8 Connection Problem on OS X with ZSH"
---

```bash
cat >> ~/.zshrc << EOF
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
EOF
```

---
