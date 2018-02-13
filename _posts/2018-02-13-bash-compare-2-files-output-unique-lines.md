---
layout: post
title: "Compare 2 Files in Bash and Output Unique Lines"
tags: [bash,shell]
---

```bash
comm -3 <(sort <$FILE1>) <(sort <$FILE2>) | sed 's/^\s*//' > <$FILE3>
```

---
