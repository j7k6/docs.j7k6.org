---
layout: post
title: "Proxy Websockets with Nginx"
---

```
location <$LOCATION_PATH> {
  ...
  proxy_pass "http://127.0.0.1:<$PROXY_PORT>/<$PROXY_PATH>";
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
}
```

---
