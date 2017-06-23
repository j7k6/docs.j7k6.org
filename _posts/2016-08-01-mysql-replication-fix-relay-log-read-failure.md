---
layout: post
title: "Fix MySQL Relay Log Read Failure"
tags: [mysql, fix]
---

```sql
STOP SLAVE;
SHOW SLAVE STATUS\G;
RESET SLAVE;
CHANGE MASTER TO MASTER_LOG_FILE=’$RELAY_MATER_LOG_FILE′, MASTER_LOG_POS=$EXEC_MASTER_LOG_POS;
START SLAVE;
```

---
1. [http://www.my-it-brain.de/wordpress/mysql-relay-log-read-failure-beheben/](http://www.my-it-brain.de/wordpress/mysql-relay-log-read-failure-beheben/)
