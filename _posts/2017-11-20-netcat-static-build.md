---
layout: post
title: "Build Static Netcat Binary (+GAPING_SECURITY_HOLE)"
tags: [netcat]
---

```bash
apt-get update
apt-get install -y build-essential curl
curl -fsSL "https://netix.dl.sourceforge.net/project/netcat/netcat/0.7.1/netcat-0.7.1.tar.gz" | tar zxvf -
cd netcat-0.7.1
LDFLAGS="-static" DFLAGS="-DGAPING_SECURITY_HOLE -DTELNET" ./configure --prefix=$PWD/install
make -j$(nproc)
make install
```

---
