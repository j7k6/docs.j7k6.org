---
layout: post
title: "Secure & Anonymous DNS Resolver with DNSCrypt-Proxy over Tor on Kali Linux"
---

1. Install packages:
   ```bash
   apt update
   apt install -y dnscrypt-proxy tor
   ```
2. Edit `/etc/dnscrypt-proxy/dnscrypt-proxy.toml`:
   ```
   listen_address = ['127.0.0.1:53']
   server_names = ['cloudflare']
   proxy = 'socks5://127.0.0.1:9050'
   force_tcp = true
   ```
3. Edit `/etc/resolv.conf`:
   ```
   nameserver 127.0.0.1
   ```
4. Make `/etc/resolv.conf` immutable to prevent any changes made to it by *NetworkManager* (and others):
   ```bash
   chattr +i /etc/resolv.conf
   ```
5. Edit `/lib/systemd/system/dnscrypt-proxy.service`. Change `User=_dnscrypt-proxy` to `User=root`.
   > **Note**: This is a dirty hack because the `dnscrypt-proxy` service refuses to listen on port **53** otherwise.
6. Enable and start the service:
   ```bash
   systemctl daemon-reload
   systemctl enable --now dnscrypt-proxy.service
   ```

---
