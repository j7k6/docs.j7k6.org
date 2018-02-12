---
layout: post
title: "Generate .htpasswd with OpenSSL"
tags: [shell, openssl, password]
---

```bash
printf "<$USER>:$(openssl passwd -apr1 <$PASSWORD>)\n" >> .htpasswd
```

---
