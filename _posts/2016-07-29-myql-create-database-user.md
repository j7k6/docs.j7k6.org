---
layout: post
title: "Create MySQL Database and User"
tags: [mysql]
---

```sql
CREATE DATABASE $DATABASE CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER $USER@localhost IDENTIFIED BY '$PASSWORD';
GRANT ALL PRIVILEGES ON $DATABASE.* TO $USER;
FLUSH PRIVILEGES;
```

---
