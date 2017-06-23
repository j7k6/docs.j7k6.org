---
layout: post
title: "Extract Public Key from SSH Private Key"
tags: [ssh]
---

```bash
ssh-keygen -y -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.pub
```

---
