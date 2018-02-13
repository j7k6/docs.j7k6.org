---
layout: post
title: "OpenSSH Public Key Authentification"
tags: [openssh]
---

## Client:
1. Generate SSH key pair
   ```bash
   ssh-keygen -t rsa
   ```
2. Store public key on remote server
   ```bash
   ssh-copy-id -i ~/.ssh/id_rsa.pub <USER>@<SERVER>
   ```

## Server
Edit `/etc/ssh/sshd_config`:
```
PasswordAuthentication no
```

```bash
service ssh restart
```

---
