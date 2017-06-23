---
layout: post
title: "Build OpenSSL with libssl from Source"
tags: [openssl]
---

```bash
curl -fsSL https://www.openssl.org/source/openssl-1.1.0e.tar.gz | tar zxvf -
cd openssl-1.1.0e
./Configure shared --prefix=/usr # ! Overwrites system's OpenSSL !
make -j$(nproc) && make install
```

---
