---
layout: post
title: "Build Docker Image without Dockerfile"
---

```
docker build -t <$IMAGE_NAME> - << EOF
FROM alpine:latest
...
EXPOSE 80
EOF
```

---
