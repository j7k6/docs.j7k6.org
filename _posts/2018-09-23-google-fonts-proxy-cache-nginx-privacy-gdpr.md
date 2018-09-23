---
layout: post
title: "Proxy and Cache Google Fonts with Nginx to Protect Privacy of Users and GDPR Compliance"
---

1. Add this `proxy_cache_path` definition on the `http` level in the Nginx configuration:
   ```
   proxy_cache_path /tmp/nginx/assets levels=1:2 keys_zone=assets:64m inactive=1d;
   ```
2. Add `/etc/nginx/conf.d/assetproxy.conf`:
   ```
   proxy_cache assets;
   proxy_cache_valid 200 1d;
   proxy_hide_header Set-Cookie;
   proxy_ignore_headers Cache-Control Expires Set-Cookie;
   proxy_set_header User-Agent "";
   proxy_set_header Accept-Encoding "";
   proxy_cache_use_stale error timeout invalid_header updating http_500 http_502 http_503 http_504;
   proxy_redirect off;

   add_header Cache-Control "public";
   ```
3. Add `/etc/nginx/conf.d/googlefonts.conf`:
   ```
   location /assets/vendor/googleapis {
     rewrite ^/assets/vendor/googleapis/(.+)$ /$1 break;
     
     include conf.d/assetproxy.conf;
     proxy_pass https://fonts.googleapis.com;
     proxy_set_header Host "fonts.googleapis.com";
     proxy_set_header User-Agent "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:37.0) Gecko/20100101 Firefox/37.0";
     expires 1d;
     
     sub_filter_once off;
     sub_filter_types text/css;
     sub_filter "https://fonts.gstatic.com" "/assets/vendor/gstatic";
   }
   
   location /assets/vendor/gstatic {
     rewrite ^/assets/vendor/gstatic/(.+)$ /$1 break;
     
     include conf.d/googlefonts.conf;
     proxy_pass https://fonts.gstatic.com:443;
     proxy_set_header Host "fonts.gstatic.com";
     expires 1y;
   }
   
   sub_filter_once off;
   sub_filter_types text/css;
   sub_filter "https://fonts.googleapis.com" "/assets/vendor/googleapis";
   ```
4. Edit the site's configuration to include `googlefonts.conf`.
   ```
   server {
     ...

     include conf.d/googlefonts.conf;
   }
   ```

---
1. <https://github.com/google/fonts/issues/1637>
2. <https://github.com/GoogleChrome/workbox/issues/1599>
3. <https://sskaje.me/2014/01/nginx-proxy-google-urls-wordpress/>
4. <https://developers.google.com/terms/#e_prohibitions_on_content>
