---
layout: post
title: "Automate 'mysql_secure_installation'"
tags: [mysql]
---

```bash
export MYSQL_ROOT_PASSWORD="<$PASSWORD>"

mysql -uroot << 'EOF'
UPDATE mysql.user SET Password=PASSWORD('$MYSQL_ROOT_PASSWORD') WHERE User='root';
DELETE FROM mysql.user WHERE user='root' AND host NOT IN ('localhost', '127.0.0.1', '::1');
DELETE FROM mysql.user WHERE user='';
DROP DATABASE test;
FLUSH PRIVILEGES;
EOF
```

---
