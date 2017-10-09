---
layout: post
title: "Backup &  Restore MySQL Databases"
tags: [mysql]
---

```bash
# Backup
mysqldump -u root -p --all-databases | gzip > dump.sql.gz

# Restore
gzip -d dump.sql.gz | mysql -u root -p
```

---
