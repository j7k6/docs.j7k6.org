---
layout:post
title: "Set Nginx Proxy Upstream Address based on Requests Originating IP Address"
tags: [nginx.proxy]
---

```
geo $upstream_addr {
  <$SPECIAL_IP>/32 127.0.0.1:8090;
  default 127.0.0.1:8080;
}

server {
  ...
  location / {
    proxy_pass http://$upstream_addr;
    ...
  }
  ...
}
```

---
1. <https://serverfault.com/a/338907>
