---
layout: post
title: "Query DNS-over-HTTP-over-Tor with Cloudflare Hidden DNS Resolver"
---

1. Install `cloudflared` (https://developers.cloudflare.com/argo-tunnel/downloads/):
   ```bash
   wget https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-amd64.deb
   dpkg -i cloudflared-stable-linux-amd64.deb
   ```
2. Setup Tor (edit `/etc/tor/torrc` & restart service):
   ```
   TransPort 9150
   ```
3. Add hidden service address to `/etc/hosts`:
   ```bash
   echo "127.0.0.1 dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion" >> /etc/hosts
   ```
4. Run `socat`:
   ```bash
   socat TCP4-LISTEN:443,reuseaddr,fork SOCKS4A:127.0.0.1:dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion:443,socksport=9150
   ```
5. Run `cloudflared` (DNS over UDP daemon):
   ```
   cloudflared proxy-dns --upstream "https://dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion/dns-query"
   ```
6. Query DNS-over-HTTP-over-Tor:
   ```bash
   dig MX gmail.com @127.0.0.1
   ```

---
1. <https://blog.cloudflare.com/welcome-hidden-resolver/>
