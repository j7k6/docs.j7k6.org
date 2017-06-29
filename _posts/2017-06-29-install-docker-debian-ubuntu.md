---
layout: post
title: "Install Docker on Debian/Ubuntu"
tags: [docker, ubuntu, debian, linux]
---

```bash
apt-get update
apt-get install -y apt-transport-https ca-certificates curl gnupg2 software-properties-common
source /etc/os-release
curl -fsSL https://download.docker.com/linux/$ID/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/$ID $(lsb_release -cs) stable"
apt-get update
apt-get install -y docker-ce
```

---
1. [https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#install-docker-ce](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#install-docker-ce)
2. [https://docs.docker.com/engine/installation/linux/docker-ce/debian/#install-docker-ce](https://docs.docker.com/engine/installation/linux/docker-ce/debian/#install-docker-ce)
