---
layout: post
title: "Generate robots.txt On-the-Fly with Nginx"
---

```
  location = /robots.txt {
    add_header Content-Type text/plain;
    return 200 "User-agent: *\nDisallow: /\n";
  }
```

---
