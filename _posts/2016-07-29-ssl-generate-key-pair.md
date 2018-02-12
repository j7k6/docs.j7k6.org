---
layout: post
title: "Generate OpenSSL Key Pair"
tags: [ssl]
---

```bash
openssl req -out <$DOMAIN>.csr -newkey rsa:4096 -nodes -sha256 -keyout <$DOMAIN>.key -subj "/CN=<$DOMAIN>"
```

---
