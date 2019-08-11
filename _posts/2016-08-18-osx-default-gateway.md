---
layout: post
title: "Get Default Gateway on OS X"
---

```bash
netstat -nr | grep -E "^default" | awk '{print $2}'
```

---
