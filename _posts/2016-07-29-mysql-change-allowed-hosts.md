---
layout: post
title: "Change Allowed Hosts in MySQL"
tags: [mysql]
---

```sql
UPDATE mysql.user SET host = '10.0.0.%' WHERE user != 'root';
UPDATE mysql.db SET host = '10.0.0.%' WHERE user != 'root';
FLUSH PRIVILEGES;
```

---
1. [http://stackoverflow.com/a/12045483](http://stackoverflow.com/a/12045483)
