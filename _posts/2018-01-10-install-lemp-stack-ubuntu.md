---
layout: post
title: "Install LEMP-Stack (Linux/Nginx/MariaDB/PHP) on Ubuntu Server"
tags: [ubuntu,linux,lemp,nginx,php,mysql,mariadb]
---

## Prerequirements
1. Install System requirements:
   ```bash
   apt-get update
   apt-get install -y python-software-properties
   ```
2. Add PPA's:
   ```bash
   add-apt-repository -y ppa:ondrej/php
   add-apt-repository -y ppa:nginx/stable
   apt-get update
   ```
3. Install packages:
   ```bash
   apt-get install -y nginx php7.1-fpm php7.1-mysql mariadb-server
   ```

## Configuration
### Nginx
1. Edit `/etc/nginx/sites-enabled/default`:
   ```
   server {
     listen 80 default_server;
	 server_name _;
     root /var/www/html;
     index index.php index.html index.htm

     location / {
       try_files $uri $uri/ =404;
     }

     location ~ \.php$ {
       include snippets/fastcgi-php.conf;
       fastcgi_pass unix:/var/run/php/php7.1-fpm.sock;
     }
   }
   ```
2. Restart Nginx: `systemctl restart nginx`

### MariaDB
```bash
mysql_secure_installation
```

---
