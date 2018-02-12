---
layout: post
title: "Nginx SSL Configuration"
tags: [nginx, ssl]
---

```nginx
server {
  listen 80;
  server_name _;
  
  return 301 https://$server_name$request_uri;
}

server {
  listen 443;
  server_name <$DOMAIN>;
  
  ssl on;
 
  ssl_certificate /etc/ssl/certs/<$DOMAIN>.pem;
  ssl_certificate_key /etc/ssl/private/<$DOMAIN>.pem;
  ssl_dhparam /etc/ssl/certs/dhparam.pem;
  
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256';
  ssl_prefer_server_ciphers on;
  
  ssl_session_timeout 1d;
  ssl_session_tickets off;
  ssl_session_cache shared:SSL:10m;
  
  add_header Strict-Transport-Security max-age=15768000;
  add_header X-Frame-Options SAMEORIGIN;
  add_header X-Content-Type-Options nosniff;
}
```

---
