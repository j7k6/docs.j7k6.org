---
layout: post
title: "Run Docker Registry"
tags: [docker]
---

```bash
docker run --name=registry --restart=always -d -p 5000:5000 registry:2
```

---
