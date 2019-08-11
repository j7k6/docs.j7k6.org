---
layout: post
title: "Install Certbot and Request Let's Encrypt SSL Certificates on Debian Jessie without a Webserver"
---

1. Install Certbot from `jessie-backports`:
   ```bash
   echo "deb http://ftp.debian.org/debian jessie-backports main" >> /etc/apt/sources.list
   apt-get update
   apt-get install -y certbot -t jessie-backports
   ```
2. Request & Install certificate from Let's Encrypt
   ```bash
   certbot certonly --email "postmaster@<$DOMAIN>" --agree-tos --standalone -d "<$DOMAIN>"
   ```

---
