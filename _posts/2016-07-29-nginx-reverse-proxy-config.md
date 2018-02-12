---
layout: post
title: "Nginx Reverse Proxy Configuration"
tags: [nginx, proxy]
---

```
upstream <$PROXY_NAME> {
  server 127.0.0.1:<$PROXY_PORT>;
}

server {
  location / {
    proxy_set_header  Host      $host;
    proxy_set_header  Proxy     "";
    proxy_set_header  X-Real-IP $remote_addr;
    proxy_pass                  http://<$PROXY_NAME>;
  }
}
```

---
