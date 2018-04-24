---
layout: post
title: "Let's Encrypt Wildcard Certificates for HAProxy with Cloudflare DNS Challenge"
tags: [cloudflare,dns,letsencrypt,certbot,haproxy,ssl,security]
---

1. Install `certbot` with Cloudflare support:
   ```bash
   pip install certbot-dns-cloudflare
   ```
2. Create `/etc/letsencrypt/cloudflare.ini` with API credentials:
   ```
   dns_cloudflare_email = <$EMAIL>
   dns_cloudflare_api_key = <$API_KEY>
   ```
3. Obtain **wildcard certificate**:
   ```bash
   certbot certonly --rsa-key-size 4096 --agree-tos --manual-public-ip-logging-ok --email="<$EMAIL>" --server=https://acme-v02.api.letsencrypt.org/directory --dns-cloudflare --dns-cloudflare-credentials=/etc/letsencrypt/cloudflare.ini --domain="*.<$DOMAIN>"
   ```
4. Create certificate-key-bundle:
   ```bash
   cat /etc/letsencrypt/live/<$DOMAIN>/fullchain.pem /etc/letsencrypt/live/<$DOMAIN>/privkey.pem > /etc/haproxy/<$DOMAIN>.pem
   ```
5. Configure *HAProxy* (`/etc/haproxy/haproxy.cfg`):
   ```
   ...
   frontend https-in
     bind 0.0.0.0:443 ssl crt /etc/haproxy/<$DOMAIN>.pem
   ...
   ```
6. Restart *HAProxy*:
   ```bash
   systemctl restart haproxy
   ```
7. Add Cronjob:
   ```
   @daily test -x /usr/bin/certbot -a ! -d /run/systemd/system && perl -e 'sleep int(rand(3600))' && certbot -q renew --renew-hook='cat /etc/letsencrypt/live/<$DOMAIN>/fullchain.pem /etc/letsencrypt/live/<$DOMAIN>/privkey.pem > /etc/haproxy/<$DOMAIN>.pem; systemctl restart haproxy'
   ```

---
