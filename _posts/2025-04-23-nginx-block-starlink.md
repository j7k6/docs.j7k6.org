---
layout: post
title: "Block Starlink IPs in Nginx"
fav: 1
---

1. Download Starlink IP subnets:
   ```bash
   curl -fsSL https://geoip.starlinkisp.net/ | awk -F',' '{print $1 " 1;"}' > /etc/nginx/starlink.conf
   ```
2. Add blocklist to Nginx `http` config:
   ```
   geo $is_starlink {
     default 0;
     include starlink.conf;
   }
   ```
3. Block IPs in `location` config:
   ```
   if ($is_starlink) {
     return 403 "fuck elon";
     # ...or redirect:
     # return 302 https://www.teslatakedown.com/;
   }
   ```
4. Restart nginx:
   ```bash
   systemctl restart nginx
   ```
5. Add cronjob for daily blocklist update:
   ```
   @daily curl -fsSL https://geoip.starlinkisp.net/ | awk -F',' '{print $1 " 1;"}' > /etc/nginx/starlink.conf; nginx -t && systemctl reload nginx;
   ```

---
