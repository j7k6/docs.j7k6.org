---
layout: post
title: "Install Zabbix on Raspberry Pi"
tags: [zabbix,raspberry-pi,raspbian,linux,monitoring]
---

1. Install Packages:
   ```bash
   export DEBIAN_FRONTEND_noninteractive
   export MYSQL_ROOT_PASSWORD="<PASSWORD>"

   echo mysql-server mysql-server/root_password select $MYSQL_ROOT_PASSWORD | debconf-set-selections
   echo mysql-server mysql-server/root_password_again select $MYSQL_ROOT_PASSWORD | debconf-set-selections

   apt-get update
   apt-get install -y \
     build-essential \
     curl \
     mariadb-server \
     libxml2-dev \
     libcurl4-openssl-dev \
     libmariadbclient-dev \
     libsnmp-dev \
     nginx \
     php7.0-fpm \
     php7.0-mysql \
     php7.0-gd \
     php7.0-mbstring \
     php7.0-bcmath \
     php7.0-xml
   ```
2. Add User & Group:
   ```bash
   groupadd zabbix
   useradd -g zabbix zabbix
   ```
3. Build & Install Zabbix
   ```bash
   curl -fsSL http://repo.zabbix.com/zabbix/3.2/debian/pool/main/z/zabbix/zabbix_3.2.7.orig.tar.gz | tar zxvf -
   cd zabbix-3.2.7
 
   ./configure \
     --enable-server \
     --enable-agent \
     --with-mysql \
     --with-net-snmp \
     --with-libcurl \
     --with-libxml2
   make install
   ```
4. Setup Database:
   ```bash
   mysql -uroot -p$MYSQL_ROOT_PASSWORD << EOF
   CREATE DATABASE zabbix CHARACTER SET utf8 COLLATE utf8_bin;
   GRANT ALL PRIVILEGES ON zabbix.* TO 'zabbix'@'localhost' IDENTIFIED BY 'zabbix';
EOF
   
   mysql -uzabbix -pzabbix zabbix < database/mysql/schema.sql
   mysql -uzabbix -pzabbix zabbix < database/mysql/images.sql
   mysql -uzabbix -pzabbix zabbix < database/mysql/data.sql
   ```
5. Copy Frontend Files to Web-Server Document Root:
   ```bash
   mkdir -p /var/www/html/zabbix
   cp -r frontends/php/* /var/www/html/zabbix/
   ```
6. Configure Nginx.
