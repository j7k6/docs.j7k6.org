---
layout: post
title: "Serve local HTML Content with simple Docker Container"
tags: [docker]
---

```bash
docker run --rm -p 8080:80 -v $PWD:/usr/local/apache2/htdocs httpd:alpine
```

---
