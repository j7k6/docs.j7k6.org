---
layout: post
title: "Remove all untagged Docker Images"
---

```bash
docker rmi -f $(docker images | grep "^<none>" | awk '{print $3}')
```

---
1. <http://jimhoskins.com/2013/07/27/remove-untagged-docker-images.html>
