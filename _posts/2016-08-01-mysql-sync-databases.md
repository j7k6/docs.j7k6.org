---
layout: post
title: "Sync MySQL Database "
tags: [mysql]
---

```bash
mysqldump -uroot -p $SRC_DB | mysql -uroot -p $DST_DB
```

---
