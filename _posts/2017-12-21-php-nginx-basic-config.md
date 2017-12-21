---
layout: post
title: "Basic PHP Configuration for Nginx"
tags: [php,nginx,linux]
---

```
server {
  listen 80 default_server;
  server_name _;
  root /var/www/html;
  index index.php;

  location / {
    try_files $uri $uri/ =404;
  }

  location ~ \.php$ {
    fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
  }

  location ~ /\.ht {
    deny all;
  }
}
```

---
