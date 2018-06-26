---
layout: post
title: "Check SSL Certificate Expiration Date with OpenSSL"
tags: [ssl,openssl]
---

```bash
echo | openssl s_client -servername <$SERVER_NAME> -connect <$SERVER_IP_OR_NAME>:443 2>/dev/null | openssl x509 -noout -dates
```

---
1. <https://www.shellhacks.com/openssl-check-ssl-certificate-expiration-date/>
