---
layout: post
title: "Compile Nginx against Bleeding Edge OpenSSL on Debian Jessie"
tags: [nginx, openssl, ssl, security, debian, linux]
---

Since *Debian Jessie* is currently lacking support for *OpenSSL 1.1.0*, *Nginx* has to be build against it manually.

1. Download Sources:
   ```bash
   mkdir nginx
   cd nginx
   curl -fsSL https://nginx.org/download/nginx-1.12.0.tar.gz | tar zxvf -
   curl -fsSL https://www.openssl.org/source/openssl-1.1.0e.tar.gz | tar zxvf -
   curl -fsSL https://ftp.pcre.org/pub/pcre/pcre-8.40.tar.gz | tar zxvf -
   curl -fsSL http://zlib.net/zlib-1.2.11.tar.gz | tar zxvf -
   cd nginx-1.12.0
   ```
2. Configure, Build, Install:
   ```bash
   ./configure \
     --sbin-path=/usr/sbin/nginx \
     --conf-path=/etc/nginx/nginx.conf \
     --with-http_v2_module \
     --with-http_ssl_module \
     --with-http_stub_status_module \
     --with-openssl=../openssl-1.1.0e \
     --with-pcre=../pcre-8.40a \
     --with_zlib=../zlib-1.2.11

   make -j$(nproc) && make install
   ```
3. Create Systemd Service `/lib/systemd/system/nginx.service`:
   ```
   [Unit]
   Description=The NGINX HTTP and reverse proxy server
   After=syslog.target network.target remote-fs.target nss-lookup.target

   [Service]
   Type=forking
   PIDFile=/run/nginx.pid
   ExecStartPre=/usr/sbin/nginx -t
   ExecStart=/usr/sbin/nginx
   ExecReload=/bin/kill -s HUP $MAINPID
   ExecStop=/bin/kill -s QUIT $MAINPID
   PrivateTmp=true

   [Install]
   WantedBy=multi-user.target
   ```
4. Enable & Start Systemd Service:
   ```bash
   systemctl enable nginx
   systemctl start nginx
   ```

---
