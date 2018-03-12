---
layout: post
title: "Generate GPG Keys Non-Interactively"
tags: [gpg]
---

1. Create `genkey` file for *RSA*-type, *4096* bit key:
   ```
   Key-Type: 1
   Key-Length: 4096
   Subkey-Type: 1
   Subkey-Length: 4096
   Name-Real: <$NAME>
   Name-Email: <$EMAIL>
   Expire-Date: 0
   Passphrase: <$PASSPHRASE>
   ```
2. Generate key:
   ```bash
   gpg --gen-key --batch genkey
   ```
3. Destroy `genkey`:
   ```bash
   gshred -u genkey
   ```

---
