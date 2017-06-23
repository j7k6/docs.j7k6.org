---
layout: post
title: "Parse JSON Values with Python"
tags: [python, json, curl]
---

```bash
curl -fsSL $URL_TO_JSON | python -c 'import sys, json; print json.load(sys.stdin)["X"]["Y"];'`
```

---
