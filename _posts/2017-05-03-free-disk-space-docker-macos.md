---
layout: post
title: "Free Disk Space from Docker VM on MacOS"
tags: [docker,macos,fix]
---

1. Connect to VM:
   ```bash
   screen ~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/tty
   ```
2. *Zero* free disk space:
   ```bash
   dd if=/dev/zero of=/var/tempfile
   ```
3. Close the terminal window and kill the *Docker* process.
4. Install `qemu`:
   ```bash
   brew install qemu
   ```
5. Compress VM disk image:
   ```bash
   cd ~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux
   mv Docker.qcow2 Docker.qcow2.orig
   qemu-img convert -O qcow2 Docker.qcow2.orig Docker.qcow2
   rm Docker.qcow2.orig
   ```
6. Start *Docker* 

---
1. [https://github.com/docker/for-mac/issues/371#issuecomment-242047368](https://github.com/docker/for-mac/issues/371#issuecomment-242047368)
