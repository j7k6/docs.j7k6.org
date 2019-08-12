---
layout: post
title: "Install MariaDB From Source"
---

## Installation
1. Install dependencies:
   ```bash
   apt-get install -y libmysqlclient-dev cmake libncurses5-dev libaio1 libaio-dev
   ```
2. Download, build & install **MariaDB**:
   ```bash
   wget https://downloads.mariadb.org/f/mariadb-5.5.31/kvm-tarbake-jaunty-x86/mariadb-5.5.31.tar.gz/from/http:/mirror2.hs-esslingen.de/mariadb -O - | tar zxf -
   cd mariadb-5.5.31
   cmake .
   make && make install
   ```
3. Add user & group:
   ```bash
   groupadd mysql
   useradd -g mysql mysql
   ```

## Configuration
1. Set permissions:
   ```bash
   chown -R mysql /usr/local/mysql
   chgrp -R mysql /usr/local/mysql
   ```
2. Setup internal database:
   ```bash
   /usr/local/mysql/scripts/mysql_install_db --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data
  ```
3. Link `mysqld_safe`binary file:
   ```bash
   ln -s /usr/local/mysql/bin/mysqld_safe /usr/bin/
   ```
4. Create MySQL configuration:
   ```bash
   mkdir /etc/mysql
   cp /usr/local/mysql/support-files/my-medium.cnf /etc/mysql/my.cnf
   ```
5. Edit `/etc/mysql/my.cnf`
   ```
   [mysqld]
   bind-address = 127.0.0.1
   ```
6. Set root Password
   ```bash
   /usr/local/mysql/bin/mysqld_safe --defaults-file=/etc/mysql/my.cnf --user=mysql --datadir=/usr/local/mysql/data &
   /usr/local/mysql/bin/mysqladmin -u root password
   ```
7. Create init script:
   ```bash
   cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql 
   chmod +x /etc/init.d/mysql
   update-rc.d -f mysql defaults
   ```
8. Restart MySQL Service:
   ```bash
   service mysql restart
   ```

---
