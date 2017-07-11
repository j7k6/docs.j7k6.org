---
layout: post
title: "My SysAdmin Cheat Sheet"
tags: []
---

## SSH
### SSH Keygen
- Generate SSH Key (unencrypted, without password):
  ```bash
  ssh-keygen -t ed25519 -b 4096 -N "" -C "<EMAIL>" -f "$HOME/.ssh/id_ed25519"
  ```
- Password-Protect Private Key:
  ```bash
  ssh-keygen -p -N "<PASSWORD>" -f "$HOME/.ssh/id_ed25519"
  ```
- Edit Comment:
  ```bash
  ssh-keygen -c -C "<EMAIL>" -f "$HOME/.ssh/id_ed25519"
  ```
- View Public Key Fingerprint:
  ```bash
  ssh-keygen -l -f "$HOME/.ssh/id_ed25519.pub"
  ```

### SSH Tunnel
- Forward Tunnel (open remote port on local host):
  ```bash
  ssh -L <LOCAL_PORT>:127.0.0.1:<REMOTE_PORT> ...
  ```
- Reverse Tunnel (open local port on remote host):
  ```bash
  ssh -R <REMOTE_PORT>:127.0.0.1:<LOCAL_PORT> ...
  ```
  
---

## SSL
- Generate Secret Key & CSR:
  ```bash
  openssl req -out <DOMAIN>.csr -newkey rsa:4096 -nodes -sha256 -keyout <DOMAIN>.key -subj "/CN=<DOMAIN>"
  ```
- Self-Sign Certificate:
  ```bash
  openssl req -out <DOMAIN>.csr -newkey rsa:4096 -nodes -sha256 -keyout <DOMAIN>.key -subj "/CN=<DOMAIN>"
  ```
- Generate Self Signed Certificate (One-Liner):
  ```bash
  openssl req -x509 -newkey rsa:4096 -nodes -sha256 -keyout <DOMAIN>.key -out <DOMAIN>.pem -days 365 -subj "/CN=<DOMAIN>"
  ```
- Generate Diffie-Hellman:
  ```bash
  openssl dhparam -out /etc/ssl/certs/dhparam.pem 4096
  ```
- Test SSL Connection:
  ```bash
  openssl s_client -connect <SERVER>:<PORT>
  ```
- Generate .htpasswd:
  ```bash
  printf "<USER>:$(openssl passwd -apr1 <PASSWORD>)\n" >> .htpasswd
  ```

---

## Linux Networking
- Set Default Route:
  ```bash
  ip route add default via <GATEWAY>
  ```
- Change Default Route:
  ```bash
  ip route replace default via <GATEWAY>
  ```
- Add Static Route:
  ```bash
  ip route add <DESTINATION> via <GATEWAY> dev <DEVICE>
  ```
- Enable IP Forwarding:
  ```bash
  sysctl -w net.ipv4.ip_forward=1
  ```

---

## Windows Networking
- Open Port in Windows Firewall:
  ```powershell
  netsh firewall set portopening tcp <PORT> "<DESCRIPTION>" enable all
  ```
- Set Default Route:
  ```powershell
  route ADD 0.0.0.0 MASK 0.0.0.0 <GATEWAY>
  ```
- Add Static Route:
  ```powershell
  route -p ADD <DESTINATION> MASK <MASK> <GATEWAY>
  ```
- Enable IP Forwarding:
  ```bash
  sysctl -w net.ipv4.ip_forward=1
  ```

---

## Docker
- Remove all Containers:
  ```bash
  docker rm -f $(docker ps -aq)
  ```
- Remove all Images:
  ```bash
  docker rmi -f $(docker images -q)
  ```
- Remove untagged Images:
  ```bash
  docker rmi -f $(docker images | grep "^<none>" | awk '{print $3}')
  ```

---

## Git
- Add Remote URL
  ```bash
  git remote add origin <REMOTE_URL>
  ```
- Change Remote URL
  ```bash
  git remote set-url origin <REMOTE_URL>
  ```

---
