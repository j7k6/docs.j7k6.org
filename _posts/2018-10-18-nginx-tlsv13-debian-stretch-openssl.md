---
layout: post
title: "Enable TLSv1.3 in Nginx on Debian Stretch"
---

**TLSv1.3** requires **OpenSSL 1.1.1** but Debian Stretch currently ships an older OpenSSL package, so TLSv1.3 is not possible by default.
Installing OpenSSL from the *unstable* repository solves this problem and enables TLSv1.3 in *Nginx*:

```bash
echo "deb http://deb.debian.org/debian unstable main" > /etc/apt/sources.list.d/unstable.list
apt update
apt install -y -t unstable openssl
```

---
