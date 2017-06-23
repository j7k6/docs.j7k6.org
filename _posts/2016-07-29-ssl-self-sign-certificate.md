---
layout: post
title: "Self-Sign SSL Certificate"
tags: [ssl]
---

```bash
openssl x509 -req -days 3650 -in $DOMAIN.csr -signkey $DOMAIN.key -out $DOMAIN.crt
```

---
