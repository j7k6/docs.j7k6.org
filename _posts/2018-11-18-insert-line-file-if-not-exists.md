---
layout: post
title: "Insert Line into File only if it doesn't exist yet"
---

```
grep -q -F "<$NEW_LINE>" <$FILE> || echo "<$NEW_LINE>" >> <$FILE>
```

---
