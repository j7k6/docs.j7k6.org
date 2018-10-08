---
layout: post
title: "Repair Corrupted MySQL/MariaDB InnoDB Database"
---

1. Stop MySQL service:
   ```bash
   systemctl stop mysql
   ```
2. Edit `/etc/mysql/my.cf`:
   ```
   innodb_force_recovery=4
   ```
3. Fix permissions (optional):
   ```bash
   chown -R mysql:mysql /var/lib/mysql
   ```
4. Start MySQL service:
   ```bash
   systemctl start mysql
   ```
5. Export all existing databases:
   ```bash
   mysqldump -A > all_databases.sql
   ```
6. Stop MySQL service:
   ```bash
   systemctl stop mysql
   ```
7. Remove `ib*` files:
   ```bash
   rm /var/lib/mysql/ib*
   ```
8. Remove/comment this line from `/etc/mysql/my.cf`:
   ```
   #innodb_force_recovery=4
   ```
9. Start MySQL service:
   ```bash
   systemctl start mysql
   ```
10. Re-import previously exported databases:
    ```bash
    mysql < all_databases.sql
    ```

---
1. <https://www.linet-services.de/was-tun-wenns-brennt-innodb-corruption-und-recovery/>
