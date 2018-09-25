---
layout: post
title: "Nginx: Configure Global Logging and Browser Caching Rules for all Sites"
---

1. Create `/etc/nginx/conf.d/map.conf`:
   ```
   map $sent_http_content_type $expires {
     default                    off;
     ~(image|font|audio|video)/ max;
     ~application/              7d;
     ~text/                     7d;
     text/html                  off;
   }

   map $sent_http_content_type $logging {
     default 0;
     text/html 1;
   }
   ```
2. Include `map.conf` in `/etc/nginx/nginx.conf`:
   ```
   http {
     ...

     include conf.d/map.conf;

     ...
   }
   ```
3. Add this lines to every site configuration:
   ```
   server {
     ...

     access_log /var/log/nginx/access.log combined if=$logging;

     add_header Cache-Control "public";
     expires $expires;
   }
   ```

---
