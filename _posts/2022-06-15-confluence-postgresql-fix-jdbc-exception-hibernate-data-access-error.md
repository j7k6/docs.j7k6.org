---
layout: post
title: "Fix Confluence 'JDBC exception on Hibernate data access' Error"
fav: 1
---

> Unable to start up Confluence. Fatal error during startup sequence: confluence.lifecycle.core:mananagedjobs (Start and stop the Managed Scheduled Jobs)  

> JDBC exception on Hibernate data access: SQLException for SQL [n/a]; SQL state [XX000]; error code [0]; could not extract ResultSet; nested exception is org.hibernate.exception.GenericJDBCException: could not extract ResultSet

When *Confluence* refuses to start with those error messages, it means that the Postgres database is corrupted, possibly due to a hard drive crash or unexpected system shutdown.

### Don't worry...
To fix it, connect to the database with `psql` and query those commands:

```sql
\c confluence
SET zero_damaged_pages = on;
VACUUM FULL public.scheduler_run_details;
VACUUM ANALYZE public.scheduler_run_details;
REINDEX DATABASE confluence;
```

Now restart Confluence. The displayed warning about the prior failure can be ignored, it won't show up again after that.

---
1. <https://community.atlassian.com/t5/Confluence-questions/Confluence-startup-fails-SQL-state-XX001-could-not-extract/qaq-p/1086827#M142920>
