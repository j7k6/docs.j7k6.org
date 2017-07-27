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
3. Build & Install Zabbix:
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
5. Edit `/usr/local/etc/zabbix/zabbix_server.conf`:
   ```
   DBHost=localhost
   DBName=zabbix
   DBUser=zabbix
   DBPassword=zabbix
   ```
6. Edit `/etc/systemd/system/zabbix-server.service`:
   ```
   [Unit]
   Description=Zabbix Server
   After=syslog.target network.target mysqld.service

   [Service]
   Type=oneshot
   ExecStart=/usr/local/sbin/zabbix_server -c /usr/local/etc/zabbix_server.conf
   ExecReload=/usr/local/sbin/zabbix_server -R config_cache_reload
   RemainAfterExit=yes
   PIDFile=/run/zabbix/zabbix_server.pid

   [Install]
   WantedBy=multi-user.target
   ```
7. Edit `/etc/systemd/system/zabbix-agent.service`:
   ```
   [Unit]
   Description=Zabbix Agent
   After=syslog.target network.target network-online.target
   Wants=network.target network-online.target

   [Service]
   Type=oneshot
   ExecStart=/usr/local/sbin/zabbix_agentd -c /usr/local/etc/zabbix_agentd.conf
   RemainAfterExit=yes
   PIDFile=/var/run/zabbix/zabbix_agentd.pid

   [Install]
   WantedBy=multi-user.target
   ```
8. Enable & Start Services:
   ```bash
   systemctl enable zabbix-server
   systemctl enable zabbix-agent
   systemctl start zabbix-server
   systemctl start zabbix-agent
   ```
9. Copy Frontend Files to Web-Server Document Root:
   ```bash
   mkdir -p /var/www/html/zabbix
   cp -r frontends/php/* /var/www/html/zabbix/
   ```
10. Configure Nginx.
