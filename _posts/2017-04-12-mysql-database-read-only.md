---
layout: post
title: "Put MySQL Database in Read-Only Mode"
tags: [mysql]
---

## Enable Read-Only Mode
```sql
FLUSH TABLES WITH READ LOCK;
SET GLOBAL read_only = 1;
```

## Disable Read-Only Mode
```sql
SET GLOBAL read_only = 0;
UNLOCK TABLES;
```

---
1. [http://stackoverflow.com/a/18401612](http://stackoverflow.com/a/18401612)
