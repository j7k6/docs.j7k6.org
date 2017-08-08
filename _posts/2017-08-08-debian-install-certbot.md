---
layout: post
title: "Install Let's Encrypt Certbot on Debian"
tags: [letsencrypt,certbot,debian,linux]
---

```bash
apt-get update
apt-get install -y python-pip libffi-dev libssl-dev
pip install --upgrade pip certbot ndg-httpsclient pyasn1 idna==2.5
```

---
