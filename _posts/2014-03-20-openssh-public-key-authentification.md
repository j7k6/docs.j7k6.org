---
layout: post
title: "OpenSSH Public Key Authentification"
---

## Client
1. Generate SSH key pair
   ```bash
   ssh-keygen -t rsa
   ```
2. Store public key on remote server
   ```bash
   ssh-copy-id -i ~/.ssh/id_rsa.pub <$USER>@<$SERVER>
   ```

## Server
1. Edit `/etc/ssh/sshd_config`:
   ```
   PasswordAuthentication no
   ```
2. Restart SSH Service
   ```bash
   service ssh restart
   ```

---
