---
layout: post
title: "Install nginx From Source"
---

1. Download sources:
   ```bash
   wget http://nginx.org/download/nginx-1.5.2.tar.gz -O - | tar zxf -
   wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.32.tar.gz -O - | tar zxf -
   wget http://zlib.net/zlib-1.2.8.tar.gz -O - | tar zxf -
   wget http://www.openssl.org/source/openssl-1.0.1e.tar.gz -O - | tar zxf -
   ```
2. Build Nginx:
   ```bash
   cd nginx-1.5.2
   ./configure \
     --with-http_ssl_module \
     --with-pcre=../pcre-8.32 \
     --with-zlib=../zlib-1.2.8 \
     --with-openssl=../openssl-1.0.1e \
     --sbin-path=/usr/bin \
     --conf-path=/etc/nginx/nginx.conf \
     --with-ipv6 \
     --with-http_dav_module 
   
   make && make install
   ```

---
