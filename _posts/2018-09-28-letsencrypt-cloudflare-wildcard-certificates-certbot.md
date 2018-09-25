---
layout: post
title: "Let's Encrypt Wildcard Certificates with Certbot and Cloudflare DNS"
fav: 1
---

1. Install *Certbot* and *Cloudflare DNS Plugin*:
   ```bash
   pip install certbot certbot-dns-cloudflare
   ```
2. Create `/etc/letsencrypt/cloudflare.ini`:
   ```
   dns_cloudflare_api_key = <$CLOUDFLARE_API_KEY>
   dns_cloudflare_email = <$CLOUDFLARE_EMAIL>
   ```
3. Restrict access to `cloudflare.ini`:
   ```bash
   chmod 0400 /etc/letsencrypt/cloudflare.ini
   ```
4. Create `/etc/letsencrypt/cli.ini`:
   ```
   dns-cloudflare-credentials = /etc/letsencrypt/cloudflare.ini
   server = https://acme-staging-v02.api.letsencrypt.org/directory
   ```
5. Get wildcard certificate from *Let's Encrypt*:
   ```bash
   certbot certonly --agree-tos --email <$EMAIL> --rsa-key-size 4096 --dns-cloudflare -d *.<$DOMAIN>
   ```

---
