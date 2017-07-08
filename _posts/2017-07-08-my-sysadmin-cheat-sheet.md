---
layout: post
title: "My SysAdmin Cheat Sheet"
tags: []
---

## SSH
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
  printf "<USER>:$(openssl passwd -crypt <PASSWORD>)\n" >> .htpasswd
  ```

---

## Linux Networking
- Set Default Route:
  ```bash
  ip route add default via <GATEWAY>
  ```
- Change Default Route:
  ```bash
  ip route replace default via <GATEWAY_IP>
  ```
- Add Static Route:
  ```bash
  ip route add <DESTINATION> via <GATEWAY> dev <DEVICE>
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
