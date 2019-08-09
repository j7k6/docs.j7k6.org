---
layout: post
title: "Upgrade Debian Stretch to Buster"
---

```bash
export DEBIAN_FRONTEND=noninteractive

apt update
apt update -y
apt dist-upgrade -y

sed -i 's/stretch/buster/g' /etc/apt/sources.list

apt update
apt update -y
apt dist-upgrade -y

reboot
```

---
