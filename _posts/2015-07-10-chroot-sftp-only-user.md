---
layout: post
title: "Add Chroot SFTP-only User (no shell access)"
tags: [chroot, ssh, linux, sftp]
---

```bash
usermod -G sftp $USER
usermod -s /bin/false $USER
chown root:root /home/$USER
chmod 0755 /home/$USER
mkdir /home/$USER/uploads
chown $USER:$USER /home/$USER/uploads
```

Edit `/etc/ssh/sshd_config`:
> ```
> ...
> # Subsystem sftp /usr/lib/openssh/sftp-server
> Subsystem sftp internal-sftp
>
> Match Group sftp
>    ChrootDirectory %h
>    ForceCommand internal-sftp
>    AllowTcpForwarding no
> ```

```bash
service ssh restart
```

---
