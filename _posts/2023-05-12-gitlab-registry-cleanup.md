---
layout: post
title: "Cleanup old GitLab Registry Images"
---

```bash
EXPERIMENTAL=true docker-distribution-pruner -config=/var/opt/gitlab/registry/config.yml -delete -soft-delete=false -soft-errors=true -jobs=100 -parallel-walk-jobs=100
```

---
1. <https://gitlab.com/gitlab-org/docker-distribution-pruner>
