---
layout: post
title: "Proxy/FastCGI Microcaching in Nginx"
---

### Proxy
```
...

location / {
  ...
  proxy_cache <$PROXY_CACHE_NAME>;
  proxy_cache_lock on;
  proxy_cache_valid any 1s;
  proxy_cache_use_stale updating;
  proxy_cache_background_update on;
}

...
```

### FastCGI (PHP-FPM)
```
...

location ~ \.php$ {
  ...
  fastcgi_cache <$FASTCGI_CACHE_NAME>;
  fastcgi_cache_lock on;
  fastcgi_cache_valid any 1s;
  fastcgi_cache_use_stale updating;
  fastcgi_cache_background_update on;
}

...
```

---
1. <https://siipo.la/blog/never-miss-the-cache-with-nginx-microcaching>
