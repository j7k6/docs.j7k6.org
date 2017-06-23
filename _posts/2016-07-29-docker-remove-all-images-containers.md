---
layout: post
title: "Remove all Docker Images and Containers"
tags: [docker]
---

### Containers
```bash
docker rm -f $(docker ps -a -q)
```

### Images
```bash
docker rmi -f $(docker images -q)
```

---
