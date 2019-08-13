---
layout: post
title: "Tor Hidden Service with Nginx on Debian"
---

## Onion Adress (optional)
> This part is optional because it's not required to tun a *Tor Hidden Service*, but it looks fancier than a completely random `.onion` address.

1. Generate `.onion` address with *Eschalot*, see [**here**](/generate-tor-onion-addresses/).
2. Create hidden service directory:
   ```bash
   mkdir -p /var/lib/tor/<$SERVICE_NAME>
   ```
3. Create `/var/lib/tor/<$SERVICE_NAME>/hostname`, containing the generated hostname.
4. Create `/var/lib/tor/<$SERVICE_NAME>/private_key`, containing the generated private key.
5. Set permissions:
   ```bash
   chown -R debian-tor:debian-tor /var/lib/tor/<$SERVICE_NAME>/
   chmod 0400 /var/lib/tor/<$SERVICE_NAME>/private_key
   ```

## Tor
1. Install *Tor*, see [**here**](/tor-debian-install/).
2. Edit `/etc/tor/torrc`:
   ```
   HiddenServiceDir /var/lib/tor/<$SERVICE_NAME>
   HiddenServicePort 80 127.0.0.1:80
   ```
4. Restart *Tor* Service:
   ```bash
   systemctl restart tor
   ```

## Nginx
1. Install *Nginx*, see [**here**](/nginx-debian-install/).
2. Edit `/etc/nginx/sites-enabled/default`:
   ```
   server_name_in_redirect off;
   server_tokens off;
   port_in_redirect off;
   proxy_ssl_server_name on;
   
   server {
     listen 127.0.0.1:80 default_server;
     server_name _;
   
     ...
   } 
   ```
3. Restart *Nginx* service:
   ```bash
   systemctl restart nginx
   ```

---
