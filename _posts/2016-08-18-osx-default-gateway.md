---
layout: post
title: "Get Default Gateway on OS X"
tags: [macos, network]
---

```bash
netstat -nr | grep -E "^default" | awk '{print $2}'
```

---
