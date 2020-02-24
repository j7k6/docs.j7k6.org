---
layout: post
title: "SSO with Nginx and Kerberos on Debian"
fav: 1
---

> This is based on ["SSO with Apache and Kerberos on Debian"](/sso-apache-kerberos-debian/). All prerequirements and configuration steps are the same, except the Apache parts. This only covers the Nginx parts of the process!

## Prerequirements
Nginx doesn't has build-in support for Kerberos Authentication, but there is a third-party [SPNEGO HTTP Authentication Module](https://github.com/stnoonan/spnego-http-auth-nginx-module) that can be compiled as a dynamic module.

1. Install required packages:
   ```bash 
   apt update
   apt install -y build-essential \
     curl \
     git \
     libkrb5-dev \
     libpcre3-dev \
     libssl-dev \
     libxml2-dev \
     libxslt1-dev \
     libgd-dev \
     libgeoip-dev \
     zlib1g-dev
    ```
 2. Clone the *SPNEGO HTTP Authentication Module* Git repo:
    ```bash
    git clone https://github.com/stnoonan/spnego-http-auth-nginx-module
    ```
 3. Download & extract the Nginx source code (get installed version with `nginx -v`, e.g. *1.14.2*):
    ```bash
    curl -fsSL https://nginx.org/download/nginx-<$NGINX_VERSION>.tar.gz | tar zxf -
    cd nginx-<$NGINX_VERSION>
    ```
 4. Get all build flags of the currently installed Nginx binary by running `nginx -V`. Copy the *configure arguments* (**without** `--add-dynamic-module=...` flags!).
 5. Run `configure` script with the copied build flags:
    ```bash
    ./configure <$NGINX_BUILD_FLAGS> --add-dynamic-module=../spnego-http-auth-nginx-module
    ```
6. Compile modules:
   ```bash
   make modules
   ```
7. Copy module:
   ```bash
   cp objs/ngx_http_auth_spnego_module.so /usr/lib/nginx/modules/
   ```

## Configuration
1. Add this line before the `http` part of `/etc/nginx/nginx.conf`:
   ```
   load_module /usr/lib/nginx/modules/ngx_http_auth_spnego_module.so;
   ```
2. Add `auth_gss` parameters to the site config:
   ```
   server {
     server_name test.example.org;
     listen 443 ssl;
     ...

     location / {
       auth_gss on;
       auth_gss_realm EXAMPLE.ORG;
       auth_gss_service_name "HTTP/test.example.org";
       auth_gss_keytab /etc/krb5.keytab;
     }
   }
   ```

---
