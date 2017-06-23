---
layout: post
title: "Nginx Basic Configuration"
tags: [nginx]
---

```nginx
user www-data;
pid /var/run/nginx.pid;
worker_processes auto;
worker_rlimit_nofile 65536;

events {
  worker_connections 16384;
  multi_accept on;
  use epoll;
}

http {
  server_tokens off;
  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;

  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log crit;

  client_body_timeout 600;
  client_max_body_size 512m;

  include mime.types;
  default_type text/html;
  charset UTF-8;

  gzip on;
  gzip_vary on;
  gzip_proxied any;
  gzip_min_length 256;
  gzip_comp_level 4;
  gzip_types
    text/plain
    text/css
    application/xml
    application/javascript;

  open_file_cache max=65536 inactive=60s;
  open_file_cache_errors on;

  include conf.d/*.conf;
  include sites-enabled/*.conf;
}
```

---
