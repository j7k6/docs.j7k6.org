---
layout: post
title: "Remove Hidden/Readonly/System Attributes from all Objects in a Directory on Windows"
tags: [windows]
---

```powershell
attrib -h -r -s "<$PATH>\*.*" /s /d
```

---
