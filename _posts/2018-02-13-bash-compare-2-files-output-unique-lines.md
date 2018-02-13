---
layout: post
title: "Compare 2 Files in Bash and Output Unique Lines"
tags: [bash,shell]
---

```bash
# Lines only in <$FILE1>
comm -23 <(sort <$FILE1>) <(sort <$FILE2>)

# Lines only in <$FILE2>
comm -13 <(sort <$FILE1>) <(sort <$FILE2>)
```

---
