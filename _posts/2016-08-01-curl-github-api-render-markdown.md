---
layout: post
title: "Render Markdown with cURL & Github API"
tags: [github, markdown, curl]
---

```bash
curl \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{"text": "<$TEXT>", "mode": "markdown"}' \
  https://api.github.com/markdown
```

---
