---
layout: post
title: "Redirect HTTP to HTTPS on a Non-Default Port with Nginx"
tags: [nginx,https]
---

When *Nginx* serves HTTPS on another port than *443*, it returns a 400 error when not requested as `https://<$URL>$<CUSTOM_PORT>` explicitly:
> **`400 Bad Request`** `The plain HTTP request was sent to HTTPS port`

To redirect to https on that port automatically, add this `error_page` directive to the *Nginx* server configuration:
```
error_page 497 =301 https://$http_host$request_uri;
```

---
1. [https://ma.ttias.be/force-redirect-http-https-custom-port-nginx/](https://ma.ttias.be/force-redirect-http-https-custom-port-nginx/)
