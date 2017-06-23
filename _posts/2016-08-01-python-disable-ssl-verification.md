---
layout: post
title: "Disable SSL Verification in Python"
tags: [python, ssl]
---

```python
import ssl

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context
```

---
