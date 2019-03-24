---
layout: post
title: "Backup Debian Server to Backblaze B2 with Duplicity and Duply"
fav: 1
---

1. Add Backports Repository:
   ```bash
   echo "deb http://deb.debian.org/debian stretch-backports main" > /etc/apt/sources.list.d/stretch-backports"
   ```
2. Install packages:
   ```bash
   apt update
   apt install duplicity duply -t stretch-backports
   pip install b2
   ```
3. Create template for non-interactive GPG key generation:
   ```
   Key-Type: 1
   Key-Length: 4096
   Subkey-Type: 1
   Subkey-Length: 4096
   Name-Real: backup-$(hostname)
   Name-Email: backup@$(hostname)
   Expire-Date: 0
   ```
4. Generate GPG key pair:
   ```bash
   gpg --pinentry-mode=loopback --passphrase="" --batch --gen-key /tmp/gpg-key-gen.txt
   rm /tmp/gpg-key-gen.txt
   ```
5. Show genereated key ID:
   ```
   gpg --list-keys --keyid-format=short backup@$(hostname) | awk '/^pub/ {print $2}' | awk -F/ '{print $2}'
   ```
6. Generate *Duply* config:
   ```bash
   duply b2 create
   ```
7. Edit `/root/.duply/b2/conf`:
   ```
   GPG_KEY="<$GPG_KEY_ID>"
   GPG_PW=""

   SOURCE="/"
   TARGET="b2://<$BACKBLAZE_ACCOUNT_ID>:<$BACKBLAZE_APPLICATION_KEY>@<$BACKBLAZE_UNIQUE_BUCKET_NAME>"

   MAX_AGE=1M
   MAX_FULL_BACKUPS=4
   MAX_FULLS_WITH_INCRS=1
   ```
8. Create `/root/.duply/b2/excludes`:
   ```yml
- /proc/*
- /sys/*
- /dev/*
- /mnt/*
- /tmp/*
- /var/cache/*
   ```
9. Create backup cronjobs:
   ```bash
   (crontab -l; echo "0 0 * * 7 /usr/bin/duply backup full_verify_purge --force > /var/log/duply.log 2>&1") | crontab -
   (crontab -l; echo "0 0 * * 1-6 /usr/bin/duply backup incr > /var/log/duply.log 2>&1") | crontab -
   ```
10. Run initial backup:
    ```bash
    duply b2 backup
    ```
11. Transfer the `/root/.duply/b2` folder to your local machine, it contains the backup configuration and the secret decryption key, which is needed to restore files from backup.

---
