---
layout: post
title: "Extract Private Key and Public Key from PFX/P12 File with OpenSSL"
---

Extract private key:
```bash
openssl pkcs12 -in <$P12_FILE> -nocerts -nodes 2>/dev/null \
  | sed -n '/^-----BEGIN PRIVATE KEY-----$/,$p' > key.pem
```

Extract public keys/certificates:
```bash
openssl pkcs12 -in <$P12_FILE> -nokeys -nodes 2>/dev/null \
  | sed -e '/-----BEGIN CERTIFICATE-----/,$!d' -e '/-----END CERTIFICATE-----/,/-----BEGIN CERTIFICATE-----/{//!d;}' > cert.pem
```

---
1. https://wiki.cac.washington.edu/display/infra/Extracting+Certificate+and+Private+Key+Files+from+a+.pfx+File
