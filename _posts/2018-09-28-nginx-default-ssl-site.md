---
layout: post
title: "Default SSL Site in Nginx"
---

1. Generate [*Snakeoil SSL Certificate*](/debian-ssl-snakeoil-certificate/).
2. Edit `/etc/nginx/sites-enabled/000-default.conf`:
   ```
   server {
     listen 80 default_server;
     server_name _;

     return 444;
   }

   server {
     listen 443 ssl default_server;
     server_name _;

     ssl_certificate /etc/ssl/certs/ssl-cert-snakeoil.pem;
     ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;

     return 444;
   }
   ```

---
