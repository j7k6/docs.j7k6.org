---
layout: post
title: "Install PHP-FPM From Source"
---

## Installation
1. Install dependencies:
   ```bash
   apt-get install -y mcrypt libmcrypt-dev libpng-dev libjpeg-dev libssl-dev libcurl4-openssl-dev libxml2-dev libc-client-dev libicu-dev
   ```
2. Download source:
   ```bash
   wget http://de2.php.net/get/php-5.5.0.tar.gz/from/de1.php.net/mirror -O - | tar zxf -
   ```
3. Build PHP:
   ```bash
   cd php-5.5.0
   ./configure \
     --prefix=/usr/local/php \
     --enable-fpm \
     --with-gd \
     --enable-mbstring \
     --enable-pcntl \
     --enable-sockets \
     --enable-zip \
     --enable-intl \
     --with-zlib \
     --with-curl \
     --with-jpeg-dir \
     --with-png-dir \
     --with-zlib-dir \
     --with-gettext \
     --with-mcrypt \
     --with-mysql \
     --with-mysqli \
     --with-pdo-mysql \
     --with-pdo-sqlite \
     --with-pear \
     --disable-debug \
     --with-imap \
     --with-imap-ssl \
     --with-kerberos --with-openssl
   
   make && make install
   ```

## Configuration
1. Copy & link config files:
   ```bash
   mkdir -p /usr/local/php/etc/conf.d
   cp php.ini-production /usr/local/php/etc/php.ini
   cp /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf
   ln -s /usr/local/php/etc /etc/php 
   ln -s /usr/local/php/bin/php /usr/bin/php 
   ln -s /usr/local/php/bin/phpize /usr/bin/phpize 
   ln -s /usr/local/php/bin/pear /usr/bin/pear
   ```
2. Edit `/usr/local/php/etc/php-fpm.conf`:
   ```
   user = www-data
   group = www-data
   ```
3. Create init script:
   ```bash
   cp sapi/fpm/init.d.php-fpm /etc/init.d/php-fpm
   chmod +x /etc/init.d/php-fpm
   update-rc.d -f php-fpm defaults
   ```
4. Start PHP-FPM service:
   ```bash
   service php-fpm start
   ```

---
