---
layout: post
title: "Webserver: nginx & PHP-FPM & MySQL (Debian Wheezy)"
tags: [nginx,php,php-fpm,mysql,debian,linux]
---

## Installation
### Add Repository
Edit `/etc/apt/sources.list`:
```
deb http://packages.dotdeb.org wheezy all
deb-src http://packages.dotdeb.org wheezy all
```

```bash
wget -O - http://www.dotdeb.org/dotdeb.gpg | sudo apt-key add -
```

### Install Packages
```bash
apt-get update
apt-get install nginx mysql-server php5-curl php5-dev php5-fpm php5-gd php5-imap php5-intl php5-mcrypt php5-mysql php5-xmlrpc
```

## Configuration
### PHP-FPM
Edit `/etc/php5/fpm/pool.d/www .conf`:
```
listen = 127.0.0.1:9000
```

```bash
service php5-fpm restart
```

### Nginx
Edit `/etc/nginx/nginx.conf`
```
server_names_hash_bucket_size 64;
```

Edit `/etc/nginx/php.conf`:
```
index index.php index.html index.htm; 

location ~ \.php$ { 
  try_files $uri =404; 

  fastcgi_split_path_info ^(.+\.php)(/.+)$; 
  include /etc/nginx/fastcgi_params; 

  fastcgi_param PATH_INFO       $fastcgi_path_info; 
  fastcgi_param PATH_TRANSLATED $document_root$fastcgi_path_info; 
  fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name; 

  fastcgi_connect_timeout        60; 
  fastcgi_send_timeout          180; 
  fastcgi_read_timeout          180; 
  fastcgi_buffer_size          128k; 
  fastcgi_buffers            4 256k; 
  fastcgi_busy_buffers_size    256k; 
  fastcgi_temp_file_write_size 256k; 

  fastcgi_intercept_errors    on; 
  fastcgi_ignore_client_abort off; 

  fastcgi_pass 127.0.0.1:9000; 
}
```

```bash
service nginx restart
```

## Virtual Host
```bash
mkdir -p /var/www/<$DOMAIN>
chown www-data:www-data -R /var/www
```

Edit `/etc/nginx/sites-available/<$DOMAIN>`
```
server {
  listen       80;
  server_name  <$DOMAIN>;
  include /etc/nginx/php.conf;
  charset utf-8;

  root /var/www/<$DOMAIN>/;
}
```

```bash
ln -s /etc/nginx/sites-available/<DOMAIN> /etc/nginx/sites-enabled
service nginx restart
```

More on [*Virtual Hosts & SSL*](/nginx-virtual-hosts-ssl).

---
