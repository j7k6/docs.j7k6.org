---
layout: post
title: "Build Docker Image without Dockerfile"
tags: [docker]
---

```
docker build -t $IMAGE_NAME - << EOF
FROM alpine:latest
...
EXPOSE 80
EOF
```

---
