---
layout: post
title: "Compile Nginx with OpenSSL from Source"
tags: [nginx, openssl]
---

```bash
#!/bin/bash

NGINX_VERSION="1.10.1"
PCRE_VERSION="8.38"
OPENSSL_VERSION="1.0.1t"
ZLIB_VERSION="1.2.8"

mkdir -p /tmp/nginx
cd /tmp/nginx

rm -rf ./src/*
mkdir -p ./src/{nginx,openssl,pcre,zlib}

curl -sSL "https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" | tar xz -C ./src/nginx --strip-component=1
curl -sSL "http://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-${PCRE_VERSION}.tar.gz" | tar xz -C ./src/pcre --strip-component=1
curl -sSL "https://www.openssl.org/source/openssl-${OPENSSL_VERSION}.tar.gz" | tar xz -C ./src/openssl --strip-component=1
curl -sSL "http://zlib.net/zlib-${ZLIB_VERSION}.tar.gz" | tar xz -C ./src/zlib --strip-component=1

cd ./src/nginx

./configure \
  --prefix=/opt/nginx \
  --user=www-data \
  --group=www-data \
  --without-http_ssi_module \
  --without-http_userid_module \
  --without-http_access_module \
  --without-http_autoindex_module \
  --without-http_geo_module \
  --without-http_map_module \
  --without-http_split_clients_module \
  --without-http_referer_module \
  --without-http_fastcgi_module \
  --without-http_uwsgi_module \
  --without-http_scgi_module \
  --without-http_memcached_module \
  --without-http_limit_conn_module \
  --without-http_limit_req_module \
  --without-http_empty_gif_module \
  --without-http_browser_module \
  --without-http_upstream_ip_hash_module \
  --without-http_upstream_least_conn_module \
  --without-http_upstream_keepalive_module \
  --with-http_gzip_static_module \
  --with-http_ssl_module \
  --with-pcre=../pcre \
  --with-openssl=../openssl \
  --with-openssl-opt="enable-tlsext no-krb5" \
  --with-zlib=../zlib

make -j$(nproc)
make install

rm -rf /tmp/nginx
```

---
