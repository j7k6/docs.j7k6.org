---
layout: post
title: "Serve HTTP Status Code 503 to Googlebot to Temporary Stop it from Crawling a Website"
tags: [nginx,google]
---

```
server {
  ...
  add_header Retry-After 3600 always;

  if ($http_user_agent ~* ".*googlebot.*") {
   return 503;
  }
  ...
}
```

---
1. <https://webmasters.googleblog.com/2011/01/how-to-deal-with-planned-site-downtime.html>
