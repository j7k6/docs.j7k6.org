---
layout: post
title: "Display Maintenance Page with Nginx"
tags: [nginx]
---

```
server {
  ...
  location / {
    if ($remote_addr !~* "127.0.0.1|10.0.0.0/24|<$ALLOWED_IP>") {
      return 503;
    }
  }

  error_page 503 @maintenance;

  location @maintenance {
    rewrite ^(.*)$ /maintenance.html break;
  }
  ...
}
```

---
