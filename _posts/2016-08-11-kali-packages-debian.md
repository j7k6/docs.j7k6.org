---
layout: post
title: "Install Kali Linux Packages in Debian"
---

1. Add PGP key:
   ```bash
   apt-key adv --keyserver pgpkeys.mit.edu --recv-keys ED444FF07D8D0BF6
   ```
2. Add package repository:
   ```bash
   cat > /etc/apt/sources.list.d/kali.list << EOF
   deb http://http.kali.org/kali sana main non-free contrib
   deb http://security.kali.org/kali-security sana/updates main contrib non-free
   
   deb-src http://http.kali.org/kali sana main non-free contrib
   deb-src http://security.kali.org/kali-security sana/updates main contrib non-free
   EOF
   ```
3. Install packages from Kali repository:
```bash
apt-get update
apt-get install kali-linux-wireless kali-linux-wireless kali-linux-forensic
```

---
