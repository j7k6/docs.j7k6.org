---
layout: post
title: "Basic Auth in Nginx"
tags: [nginx]
---

### Nginx config:
```
server {
  ...
  location /secret/ {
    auth_basic "Top Secret!";
    auth_basic_user_file /etc/nginx/.htpasswd;
  }
}
```

### Generate .htpasswd:
```bash
printf "<$USER>:$(openssl passwd -apr1 <$PASSWORD>)\n" >> /etc/nginx/.htpasswd
```

---
