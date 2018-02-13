---
layout: post
title: "SSL Certificates"
tags: [ssl,openssl]
---

## Private key and CSR
First, the private key and a *Certificate Sign Request* (CSR) have to be generated.

```bash
openssl req -out <DOMAIN>.csr -newkey rsa:4096 -nodes -keyout <DOMAIN>.key
```

> **Note:** All fields can be empty, except Common Name! It needs to be the exact domain name for which the certificate is intended for.

## Sign CSR
> **Note:** There are two options here: 

1. The CSR could be signed by an **official CA** (like [StartSSL](https://www.startssl.com), see [*here*](/startssl-certificate-validation)), or 
2. **Self-signed**. The self-signed certificate will cause a warning in the browser. To self-sign a CSR, execute:
   ```bash
   openssl x509 -req -days 365 -in <DOMAIN>.csr -signkey <DOMAIN>.key -out <DOMAIN>.crt
   ```

---
