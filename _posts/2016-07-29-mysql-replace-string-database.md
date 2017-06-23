---
layout: post
title: "Replace String in entire MySQL Database"
tags: [mysql]
---

```bash
mysqldump -u$USER -p$PASSWORD $DATABASE | \
  sed -e 's/$OLD_STRING/$NEW_STRING/g' | \
  mysql -u$USER -p$PASSWORD $DATABASE
```

---
