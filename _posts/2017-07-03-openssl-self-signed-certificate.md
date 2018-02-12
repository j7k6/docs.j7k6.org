---
layout: post
title: "OpenSSL: Generate Self Signed Certificate"
tags: [ssl, openssl]
---

```bash
openssl req -x509 -newkey rsa:4096 -nodes -sha256 -keyout <$DOMAIN>.key -out <$DOMAIN>.pem -days 365 -subj "/CN=<$DOMAIN>"
```

---
