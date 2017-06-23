---
layout: post
title: "Install Docker on Ubuntu Server 16.04 LTS"
tags: [ubuntu, docker]
---

```bash
echo "deb https://apt.dockerproject.org/repo ubuntu-xenial main" > /etc/apt/sources.list.d/docker.list
apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
apt-get update
apt-get install -y docker-engine
```

---
1. [https://docs.docker.com/engine/installation/linux/ubuntulinux/](https://docs.docker.com/engine/installation/linux/ubuntulinux/)
