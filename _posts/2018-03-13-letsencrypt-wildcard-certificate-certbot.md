---
layout: post
title: "Obtain Let's Encrypt Wildcard Certificate with certbot"
tags: [certbot,letsencrypt,ssl,linux,dns]
---

1. Remove the `certbot` system package, because it's most likely not *ACMEv2* compatible yet:
   ```bash
   apt-get remove -y certbot
   ```
2. Install `certbot` (*>= v0.22.0*) with pip:
   ```bash
   pip install --upgrade certbot
   ```
3. Obtain wildcard certificate:
   ```bash
   certbot certonly --rsa-key-size 4096 --manual --agree-tos --manual-public-ip-logging-ok --email="<$EMAIL>" --server=https://acme-v02.api.letsencrypt.org/directory --preferred-challenges=dns --domain="*.<$DOMAIN>"
   ```

`certbot` will ask you to create a new `TXT` DNS record for the Domain. Create the record and continue in `certbot` by pressing *enter*.

---
