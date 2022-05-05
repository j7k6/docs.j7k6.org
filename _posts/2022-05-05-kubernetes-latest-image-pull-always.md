---
layout: post
title: "Kubernetes: Always Pull Images with 'latest' Tag using Helm"
---

```yaml
kind: Deployment
spec:
  template:
    metadata:
      labels:
        date: "{% raw %}{{ now | unixEpoch }}{% endraw %}"
```

---
1. <https://stackoverflow.com/a/71016950>
