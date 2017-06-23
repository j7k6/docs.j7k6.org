---
layout: post
title: "Upgrade Debian Squeeze to Wheezy"
tags: [debian, upgrade, linux]
---

```bash
cat > /etc/apt/sources.list << EOF
deb http://archive.debian.org/debian/ squeeze main non-free contrib
deb-src http://archive.debian.org/debian/ squeeze main non-free contrib
deb http://archive.debian.org/debian-security/ squeeze/updates main non-free contrib
deb-src http://archive.debian.org/debian-security/ suqeeze/updates main non-free contrib
EOF

apt-get install debian-archive-keyring
apt-get update
apt-get upgrade
apt-get dist-upgrade

cat > /etc/apt/sources.list << EOF
deb http://security.debian.org/ wheezy/updates main
deb-src http://security.debian.org/ wheezy/updates main

deb http://ftp.de.debian.org/debian/ wheezy main contrib non-free
deb-src http://ftp.de.debian.org/debian/ wheezy main contrib non-free
EOF

apt-get update
apt-get upgrade
apt-get dist-upgrade
reboot
```

---
