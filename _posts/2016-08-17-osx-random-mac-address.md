---
layout: post
title: "Set Random MAC Adress on OS X"
tags: [macos, network]
---

```bash
sudo ifconfig en0 ether `openssl rand -hex 6 | sed 's/\(..\)/\1:/g; s/.$//'`
```

---
1. [http://www.alecjacobson.com/weblog/?p=4616](http://www.alecjacobson.com/weblog/?p=4616)
