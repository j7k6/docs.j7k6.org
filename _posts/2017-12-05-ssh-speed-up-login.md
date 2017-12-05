---
layout: post
title: "Speed-Up SSH Login"
tags: [ssh]
---

If logging into an SSH server takes a long time, this configugation modifications might help:

1. In `/etc/ssh/sshd_config` make sure those lines are set or uncommented:
   ```
   GSSAPIAuthentication no
   GSSAPIDelegateCredentials yes
   UseDNS no
   ```
2. In `/etc/nsswitch.conf` set the values like this:
   ```
   passwd:         compat
   group:          compat
   shadow:         compat
   ```

---
1. [https://superuser.com/questions/359344/ssh-is-slow-to-make-a-connection](https://superuser.com/questions/359344/ssh-is-slow-to-make-a-connection)
2. [https://unix.stackexchange.com/questions/5621/how-to-speed-my-too-slow-ssh-login](https://unix.stackexchange.com/questions/5621/how-to-speed-my-too-slow-ssh-login)
