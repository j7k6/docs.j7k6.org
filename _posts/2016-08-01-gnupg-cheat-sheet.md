---
layout: post
title: "GnuPG Cheat Sheet"
tags: [gnupg, pgp]
---

```bash
# Encrypt file with password
gpg -c -a --cipher-algo AES256 <$FILE>

# Decrypt file with password
gpg -o <$FILE> -d <$FILE>.asc

# Export public key
gpg --armor --export <$EMAIL>
```

---
