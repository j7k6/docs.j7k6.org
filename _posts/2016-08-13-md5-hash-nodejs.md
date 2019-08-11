---
layout: post
title: "Generate MD5 Hash in Node.js"
---

```javascript
var hash = require('crypto').createHash('md5').update(<$STRING>).digest("hex");
```

---
