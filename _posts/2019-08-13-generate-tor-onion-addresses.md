---
layout: post
title: "Generate Onion Addresses for Tor Hidden Services"
---

 > **Note**: Don't use more than 6-7 characters for `<$SERVICE_NAME>`. 8 character words might take several days to generate, even on a modern CPU. If you have some GPU power, you can use [*Scallion*](https://github.com/lachesis/scallion) to speed things up.

1. Install *OpenSSL* libraries and some build tools:
   ```bash
   apt update
   apt install -y libssl-dev build-essential
   ```
2. Download *Eschalot*:
   ```bash
   wget https://github.com/ReclaimYourPrivacy/eschalot/archive/master.zip
   unzip master.zip
   ```
3. Build *Eschalot*:
   ```bash
   cd eschalot-master
   make
   ```
4. Run *Eschalot*:
   ```bash
   ./eschalot -vct$(nproc) -r "^<$SERVICE_NAME>"
   ```

---
