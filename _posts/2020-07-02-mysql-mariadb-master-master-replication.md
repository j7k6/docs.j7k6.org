---
layout: post
title: "MariaDB Master-Master Replication"
---

> **Note**: This requires two servers with a running MariaDB installation.

## MariaDB Config
**(on both servers)**

1. Add *MariaDB* config in the `[mysqld]` section:
   ```
   log-bin
   server_id=1
   log-basename=<$REPLICATION_NAME>
   replicate-do-db=<$REPLICATION_DATABASE>
   bind-address=0.0.0.0
   ```
2. Restart *MariaDB* service.
3. Open a `mysql` shell.
4. Create user for replication:
   ```
   CREATE USER '<$REPLICATION_USER>'@'%' IDENTIFIED BY '<$REPLICATION_PASSWORD>';
   ```
5. Grant permission to replication user:
   ```
   GRANT REPLICATION REPLICA ON *.* TO '<$REPLICATION_USER>'@'%';
   FLUSH PRIVILEGES;
   ```

## Replication Setup
1. **(server1)** Query Master status and note `File` and `Position` for the next step:
   ```
   SHOW MASTER STATUS;
   ```
2. **(server2)** Configure replication:
   ```
   STOP REPLICA;
   CHANGE MASTER TO MASTER_HOST='<$SERVER1_IP>', MASTER_USER='<$REPLICATION_USER>', MASTER_PASSWORD='<$REPLICATION PASSWORD>', MASTER_LOG_FILE='<$FILE>', MASTER_LOG_POS=<$POSITION>;
   START REPLICA;
   ```
3. **(server2)** Query Master status and note `File` and `Position` for the next step:
   ```
   SHOW MASTER STATUS;
   ```
2. **(server1)** Configure replication:
   ```
   STOP REPLICA;
   CHANGE MASTER TO MASTER_HOST='<$SERVER2_IP>', MASTER_USER='<$REPLICATION_USER>', MASTER_PASSWORD='<$REPLICATION PASSWORD>', MASTER_LOG_FILE='<$FILE>', MASTER_LOG_POS=<$POSITION>;
   START REPLICA;
   ```

---
