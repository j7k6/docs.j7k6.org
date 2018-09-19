---
layout: "post"
title: "Expose Docker Daemon API via TCP"
---

1. Edit Docker Systemd Service (`EDITOR=vim systemctl edit docker`):
   ```
   [Service]
   ExecStart=
   ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock
   ```
2. Restart Docker Daemon:
   ```bash
   systemctl restart docker
   ```

---
1. <https://success.docker.com/article/using-systemd-to-control-the-docker-daemon>
