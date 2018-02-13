---
layout: post
title: "nginx: Virtual Host & SSL"
tags: [nginx,ssl]
---

## SSL Certificates
See [*here*](/ssl-certificates).

## Configuration
Edit `/etc/nginx/sites-available/<$DOMAIN>`:
```
server {
  listen 80;
  server_name <$DOMAIN> www.<$DOMAIN>;
  rewrite ^ https://$host$request_uri? permanent;
}

server {
  listen 443;
  server_name <$DOMAIN> www.<$DOMAIN>;

  ssl on;
  ssl_certificate /etc/ssl/certs/<$DOMAIN>.pem;
  ssl_certificate_key /etc/ssl/private/<$DOMAIN>.key;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; 
  ssl_prefer_server_ciphers on;
  ssl_ciphers "EECDH+AESGCM EDH+AESGCM EECDH -RC4 EDH -CAMELLIA -SEED !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS !RC4";
  ssl_session_cache shared:SSL:10m;
  ssl_session_timeout 10m;

  add_header Strict-Transport-Security max-age=15768000;

  root /var/www/<$DOMAIN>/;
}
```

### Enable Virtual Host
```bash
ln -s /etc/nginx/sites-available/<$DOMAIN> /etc/nginx/sites-enabled/
service nginx restart
```

## SSL Server Test
Use the [Qualys SSL Server Test](https://www.ssllabs.com/ssltest/) to determine the security rating of this configuration.

![ssllabs](/files/nginx-virtual-hosts-ssl/ssllabs.png)

---
1. [http://www.kuketz-blog.de/nsa-abhoersichere-ssl-verschluesselung-fuer-apache-und-nginx]( http://www.kuketz-blog.de/nsa-abhoersichere-ssl-verschluesselung-fuer-apache-und-nginx)
