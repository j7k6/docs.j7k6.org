---
layout: post
title: "Install Tor on Debian"
---

1. Install dependencies:
   ```bash
   apt update
   apt install -y curl apt-transport-https
   ```
2. Add `/etc/apt/source.list.d/tor.list`:
   ```
   deb https://deb.torproject.org/torproject.org buster main
   deb-src https://deb.torproject.org/torproject.org buster main
   ```
3. Import signing key:
   ```bash
   curl https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --import
   gpg --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | apt-key add -
   ```
4. Install the `tor` package:
   ```bash
   apt update
   apt install -y tor deb.torproject.org-keyring
   ```

---
