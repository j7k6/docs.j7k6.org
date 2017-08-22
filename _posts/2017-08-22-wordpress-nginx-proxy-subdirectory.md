---
layout: post
title: "Nginx Proxy for Wordpress in Subdirectory (+ 'wp-admin' Fix)"
tags: [nginx, proxy, wordpress, fix]
---

Appearantly *Wordpress* isn't suppose to be hosted in a subdirectory, especially when reverse-proxied to a Docker container via Nginx.
The biggest problem is getting `wp-admin` to play along... here is some kind of solution:

### Nginx
```
location /blog/ {
  proxy_set_header  Host               $host;
  proxy_set_header  X-Real-IP          $remote_addr;
  proxy_set_header  X-Forwarded-For    $proxy_add_x_forwarded_for;
  proxy_set_header  X-Forwarded-Proto  $scheme;
  proxy_pass http://127.0.0.1:8080/; # <-- mind the trailing slash!
}
```

### wp-config.php
```
define('WP_HOME', 'https://<DOMAIN>/blog');
define('WP_SITEURL', 'https://<DOMAIN>/blog');

$_SERVER['REQUEST_URI'] = str_replace("/wp-admin/", "/blog/wp-admin/",  $_SERVER['REQUEST_URI']);
```

---
1. [https://stackoverflow.com/a/35777445](https://stackoverflow.com/a/35777445)
2. [http://www.ur-ban.com/2015/07/27/nginx-proxy_pass-wordpress-in-a-sub-directory/](http://www.ur-ban.com/2015/07/27/nginx-proxy_pass-wordpress-in-a-sub-directory/)
