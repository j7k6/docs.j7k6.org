---
layout: post
title: "Simple Git Server on Debian/Ubuntu"
tags: [git, linux, debian, ubuntu]
---

1. Install Git:
   ```bash
   apt-get install git
   ```
2. Add Git User:
   ```bash
   adduser --home /var/git --shell $(which git-shell) --gecos "" git
   ```
3. Add SSH Key(s):
   ```bash
   sudo -u git mkdir ~git/.ssh
   
   sudo -u git cat > ~git/.ssh/authorized_keys << EOF
   ssh-rsa ...
   EOF

   chmod -R 0700 ~git/.ssh
   ```
4. Create new Git repo:
   ```bash
   sudo -u git mkdir ~git/$REPO.git
   sudo -u git git -C ~git/$REPO.git init --bare
   ```

---
1. [https://eklitzke.org/how-to-how-your-own-private-git-repositories](https://eklitzke.org/how-to-how-your-own-private-git-repositories)
2. [https://git-scm.com/book/en/v2/Git-on-the-Server-Setting-Up-the-Server](https://git-scm.com/book/en/v2/Git-on-the-Server-Setting-Up-the-Server)
