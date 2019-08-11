---
layout: post
title: "Download SSL Certificate from Website"
---

## Option 1
```bash
openssl s_client -connect <$HOST>:443 -showcerts < /dev/null 2> /dev/null | openssl x509 -outform PEM > cert.pem
```

## Option 2
```bash
echo "GET" | openssl s_client -connect <$HOST>:443 -showcerts | sed -n '/BEGIN CERTIFICATE/,/END CERTIFICATE/p'
```

---
1. [http://superuser.com/a/641396](http://superuser.com/a/641396)
2. [https://calomel.org/postfix.html](https://calomel.org/postfix.html)
