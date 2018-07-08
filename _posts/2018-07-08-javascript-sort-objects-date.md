---
layout: post
title: "Javascript: Sort Objects by Date Property"
tags: [javascript,code-snippets]
---

```javascript
results.sort(function(a, b) {
  return (new Date(a.date) < new Date(b.date)) ? 1 : -1;
});
```

---
