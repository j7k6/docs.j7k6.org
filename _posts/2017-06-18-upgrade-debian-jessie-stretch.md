---
layout: post
title: "Upgrade Debian Jessie to Stretch"
tags: [debian, linux]
---

```bash
apt-get update
apt-get upgrade
apt-get dist-upgrade

sed -i 's/jessie/stretch/g' /etc/apt/sources.list

apt-get update
apt-get upgrade
apt-get dist-upgrade

reboot
```

---
