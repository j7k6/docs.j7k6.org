---
layout: post
title: "Replace Wordpress URLs in Database for all Posts"
tags: [wordpress, mysql, sed]
---

```
mysqldump -u<$DB_USER> -p<$DB_PASS> <$DB_NAME> \
  | sed 's|<$OLD_URL>|<$NEW_URL>|g' \
  | mysql -u<$DB_USER> -p<$DB_PASS> <$DB_NAME>
```

---
