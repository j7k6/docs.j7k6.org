---
layout: post
title: "Nginx Reverse Proxy for SSH"
---

Add this block to `/etc/nginx/nginx.conf`:
```
load_module /usr/lib/nginx/modules/ngx_stream_module.so;

stream {
  upstream ssh-proxy {
    server <$SSH_HOST>:22;
  }

  server {
    listen 22;
    proxy_pass ssh-proxy;
  }
}
```
