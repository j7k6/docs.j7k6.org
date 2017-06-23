---
layout: post
title: "Set-up Nginx with Let's Encrypt Certificate on Debian Jessie for a perfect SSL Labs Rating"
tags: [letsencrypt, nginx, debian, linux, ssllabs, ssl]
---

## Prerequirements
- [Compile Nginx Against Bleeding Edge OpenSSL On Debian Jessie](/compile-nginx-openssl-debian-jessie/)
- [Install Certbot from jessie-packports](/install-certbot-letsencrypt-debian-jessie-ssl-certificates/)

## Initial Nginx Config
Initially, a non-SSL virtual host config has to be created, because the certificate is not yet available at this point.

1. Create `/etc/nginx/sites-available/$DOMAIN.conf`:
   ```bash
   server {
     listen 80;
     server_name $DOMAIN www.$DOMAIN;
      
     location /.well-known/acme-challenge {
       root /var/www/letsencrypt;
     }
   }
   ```
2. Create directory for the *ACME Challenge*:
   ```bash
   mkdir -p /var/www/letsencrypt
   ```
3. Link virtual host config:
   ```bash
   ln -s /etc/nginx/sites-available/$DOMAIN.conf /etc/nginx/sites-enabled/
   ```
4. Restart Nginx:
   ```bash
   systemctl restart nginx
   ```

## Certbot
1. Request a certificate from [*Let's Encrypt*](https://letsencrypt.org):
   ```bash
   certbot certonly --rsa-key-size 4096 --webroot -w /var/www/letsencrypt -d $DOMAIN -d www.$DOMAIN
   ```
2. Modify Renewal Cronjob in `/etc/cron.d/certbot`, append `--post-hook "service nginx reload"` to `certbot renew` command.

## Final Nginx SSL Config
Now that the certificate is available, the final virtual host config can be deployed.

1. Edit `/etc/nginx/sites-available/$DOMAIN.conf`:
   ```
   server {
     listen 80;
     server_name $DOMAIN www.$DOMAIN;

     location /.well-known/acme-challenge {
       root /var/www/letsencrypt;
     }

     location / {
       return 301 https://www.$DOMAIN$request_uri;
     }
   }

   server {
     listen 443 ssl http2;
     server_name $DOMAIN www.$DOMAIN;

     ssl on;
     ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
     ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
     ssl_trusted_certificate /etc/letsencrypt/live/$DOMAIN/chain.pem;

     ssl_protocols TLSv1.2;
     ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256';
     ssl_prefer_server_ciphers on;
     ssl_ecdh_curve secp384r1;

     ssl_dhparam /etc/ssl/certs/dhparam.pem;

     ssl_session_timeout 1d;
     ssl_session_cache shared:SSL:50m;
     ssl_session_tickets off;

     ssl_stapling on;
     ssl_stapling_verify on;
     resolver 8.8.8.8 8.8.4.4 valid=300s;

     add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
     add_header X-Frame-Options "SAMEORIGIN";
     add_header X-Content-Type-Options "nosniff";
     ...
   }
   ```
> *Note*: A modern cipher list (`ssl_ciphers`) can be generated with the [Mozilla SSL Configuration Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/).
2. Generate Diffie-Hellman Key Exchange:
   ```bash
   openssl dhparam -out /etc/ssl/certs/dhparam.pem 4096
   ```
3. Restart Nginx:
   ```bash
   systemctl restart nginx
   ```

## Qualys SSL Labs Test
Now that all is set-up, it's time to boost the Sysadmin's ego with a perfect [**SSL Labs**](https://www.ssllabs.com/ssltest) test result:

![ssllabs](/files/nginx-letsencrypt-debian-jessie-ssllabs/ssllabs.png)

---
1. [https://www.sherbers.de/howto/nginx/](https://www.sherbers.de/howto/nginx/)
2. [https://sethvargo.com/getting-an-a-plus-on-qualys-ssl-labs-tester/](https://sethvargo.com/getting-an-a-plus-on-qualys-ssl-labs-tester/)
3. [https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html](https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html)
