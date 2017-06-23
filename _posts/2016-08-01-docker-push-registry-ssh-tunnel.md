---
layout: post
title: "Push Docker Images to Remote Registry through SSH Tunnel"
tags: [docker, ssh]
---

```bash
# $REG_IP needs to be added as insecure registry in the local docker client

# on macOS a loopback alias IP has to be used (e.g. 172.16.123.1).
sudo ifconfig lo0 alias 172.16.123.1
REG_IP="172.16.123.1"

# on Linux
REG_IP="127.0.0.1"

# open tunnel in background
ssh -o ControlPath=/tmp/temp_ssh_tunnel -f -N -M -L ${REG_IP}:5000:127.0.0.1:5000 ${SSH_OPTIONS} ${SSH_USER}@${SSH_HOST}

# push through tunnel
docker tag "${DOCKER_IMAGE}:${BUILD_VERSION}" "${REG_IP}:5000/${DOCKER_IMAGE}:${BUILD_VERSION}"
docker push "${REG_IP}:5000/${DOCKER_IMAGE}:${BUILD_VERSION}"

# close tunnel
ssh -o ControlPath=/tmp/temp_ssh_tunnel -O exit ${SSH_OPTIONS} ${SSH_USER}@${SSH_HOST}
```

---
