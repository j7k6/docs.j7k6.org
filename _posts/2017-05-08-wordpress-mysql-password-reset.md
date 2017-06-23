---
layout: post
title: "Reset Wordpress Admin Password in MySQL Database"
tags: [wordpress, mysql]
---

```mysql
UPDATE `wp_users` SET `user_pass` = MD5('<NEW_PASSWORD>') WHERE `id`=1 LIMIT 1;
```

---
