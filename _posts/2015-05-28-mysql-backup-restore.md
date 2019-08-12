---
layout: post
title: "Backup & Restore MySQL Databases"
---

## Backup
```bash
mysqldump -u root -p --all-databases | gzip > dump.sql.gz
```

## Restore
```bash
gzip -d dump.sql.gz | mysql -u root -p
```

---
