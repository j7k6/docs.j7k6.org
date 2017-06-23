---
layout: post
title: "Generate .htpasswd with OpenSSL"
tags: [shell, openssl, password]
---

```bash
printf "$USER:$(openssl passwd -crypt $PASSWORD)\n" >> .htpasswd
```

---
