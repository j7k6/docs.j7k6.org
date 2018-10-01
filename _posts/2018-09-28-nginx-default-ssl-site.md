---
layout: post
title: "Default SSL Site in Nginx"
---

1. Generate [*Snakeoil SSL Certificate*](/debian-ssl-snakeoil-certificate/) – or:
   ```bash
   openssl req -x509 -newkey rsa:4096 -nodes -sha256 -keyout /etc/ssl/private/ssl-cert-snakeoil.key -out /etc/ssl/certs/ssl-cert-snakeoil.pem -days 3650 -subj "/CN=<$PUBLIC_IP_ADDRESS>"
   ```
2. Create `/etc/nginx/sites-enabled/000-default.conf`:
   ```
   server {
     listen 80 default_server;
     listen 443 ssl default_server;
     server_name _;

     ssl_certificate /etc/ssl/certs/ssl-cert-snakeoil.pem;
     ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;

     return 444;
   }
   ```

---
