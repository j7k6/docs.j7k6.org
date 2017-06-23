---
layout: post
title: "Install Newer Linux Kernel on Debian from Backports"
tags: [debian, linux, kernel]
---

```bash
echo "deb http://ftp.debian.org/debian/ jessie-backports main non-free contrib" > /etc/apt/sources.list.d/jessie-backports.list
apt-get update
apt-get -t jessie-backports install linux-image-amd64
```

---
