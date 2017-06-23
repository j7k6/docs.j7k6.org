---
layout: post
title: "Reset MySQL Auto Increment Value after Delete"
tags: [mysql]
---

```sql
SELECT @max := MAX(ID)+ 1 FROM ABC; 

PREPARE stmt FROM 'ALTER TABLE ABC AUTO_INCREMENT = ?';
EXECUTE stmt USING @max;

DEALLOCATE PREPARE stmt;
```

---
1. [http://stackoverflow.com/a/2411823](http://stackoverflow.com/a/2411823)
