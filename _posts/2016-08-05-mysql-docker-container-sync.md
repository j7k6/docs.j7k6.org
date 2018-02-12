---
layout: post
title: "Sync MySQL Databases between 2 Docker Containers"
tags: [mysql, docker]
---

```bash
docker exec <$SRC_CONTAINER> mysqldump -u<$DB_USER> -p<$DB_PASS> <$DB_NAME> | docker exec -i <$DST_CONTAINER> mysql -u<$DB_USER> -p<$DB_PASS> <$DB_NAME>
```

---
