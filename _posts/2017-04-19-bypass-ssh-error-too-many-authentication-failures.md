---
layout: post
title: "Bypass SSH Error 'Too many authentication failures'"
tags: [ssh, fix]
---

### Problem:
When a client has multiple SSH keys loaded into the SSH agent, it might occur that a server exceeds its limit for failed authentication attempts before it reaches the right key, resulting in the following error message:

> `Received disconnect from <IP> port 22:2: Too many authentication failures for <USER> Authentication failed.`

### Solution:
There are (at least) two solutions to this problem:

1. Specify a key:
   ```bash
   ssh -i ~/.ssh/id_rsa <USER>@<SERVER>
   ```
2. Disable *Pubkey*-Authentication:
   ```bash
   ssh -o PubkeyAuthentication=no <USER>@<SERVER>
   ```

---
