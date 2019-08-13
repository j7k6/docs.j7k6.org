---
layout: post
title: "Install Nginx on Debian"
---

1. Add `/etc/apt/source.list.d/tor.list`:
   ```
   deb http://nginx.org/packages/debian buster nginx
   ```
2. Import signing key:
   ```bash
   curl -fsSL https://nginx.org/keys/nginx_signing.key | apt-key add -
   ```
3. Install the `nginx` package:
   ```bash
   apt update
   apt install -y nginx
   ```

---
1. <http://nginx.org/en/linux_packages.html#Debian>
