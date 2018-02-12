---
layout: post
title: "Reset MySQL Root Password"
tags: [mysql, password]
---

```bash
service mysql stop

mysqld_safe --skip-grant-tables &

mysql -u root mysql <<EOF
  UPDATE user SET password=PASSWORD("<$NEW_ROOT_PASSWORD>") WHERE user='root';
  FLUSH PRIVILEGES;
EOF

service mysql restart
```

---
