---
layout: post
title: "Change MySQL Database Charset from Latin1 to UTF8"
tags: [mysql, utf-8]
---

### Method 1:
```bash
mysqldump -u<$USER> -p<$PASSWORD> -c -e --default-character-set=utf8 --single-transaction --skip-set-charset --add-drop-database -B $DATABASE | \
  sed -e 's/DEFAULT CHARACTER SET latin1/DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci/' -e 's/DEFAULT CHARSET=latin1/DEFAULT CHARSET=utf8/' | \
  mysql -u<$USER> -p<$PASSOWRD>
```

### Method 2:
1. Generate SQL statements
```sql
SELECT CONCAT('ALTER TABLE `', tbl.`TABLE_SCHEMA`, '`.`', tbl.`TABLE_NAME`, '` CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;') FROM `information_schema`.`TABLES` tbl WHERE tbl.`TABLE_SCHEMA` = '<$DATABASE>'
```
2. Query generated SQL statements

---
1. [https://docs.moodle.org/23/en/Converting_your_MySQL_database_to_UTF8](https://docs.moodle.org/23/en/Converting_your_MySQL_database_to_UTF8)
