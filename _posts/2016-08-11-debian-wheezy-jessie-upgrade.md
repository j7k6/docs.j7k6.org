---
layout: post
title: "Upgrade Debian Wheezy to Jessie"
tags: [debian, upgrade, linux]
---

```bash
apt-get update
apt-get upgrade
apt-get dist-upgrade

sed -i 's/wheezy/jessie/g' /etc/apt/sources.list

apt-get update
apt-get upgrade
apt-get dist-upgrade
reboot
```

---
