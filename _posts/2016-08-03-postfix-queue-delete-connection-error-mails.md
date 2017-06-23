---
layout: post
title: "Delete Connection Error Mails from Postfix Queue"
tags: [postfix, mail]
---

```bash
mailq | \
  grep -E "Connection (refused|timed out)" -B1 | \
  grep -E "^[A-Z0-9]{10}\s+" | \
  awk '{print $1}' | \
  postsuper -d -
```

---
