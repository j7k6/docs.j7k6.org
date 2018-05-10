---
layout: post
title: "Encrypted Debian Filesystem Backup on Amazon S3 with Duplicity and Duply"
tags: [backup,s3,amazon,linux,debian,duplicity]
---

1. Install packages:
   ```bash
   apt-get update
   apt-get install -y duplicity duply python-boto
   ```
2. Generate *GPG* keypair:
   ```bash
   gpg --gen-key
   ```
3. Export secret key (optional)
   ```bash
   gpg --list-keys # to get <$GPG_KEY_ID>
   gpg --export-secret-keys -a <$GPG_KEY_ID> > backupkey.asc
   ```
4. Create `duply` backup profile:
   ```bash
   duply backup create
   ```
5. Edit `/etc/duply/backup/conf`:
   ```
   GPG_KEY="<$GPG_KEY_ID>"
   GPG_PW="<$GPG_KEY_PASSWORD"

   TARGET="s3://s3.<$AWS_REGION>.amazonaws.com/<$AWS_BUCKET>/<$BACKUP_NAME>"

   export AWS_ACCESS_KEY_ID="<$AWS_ACCESS_KEY_ID"
   export AWS_SECRET_ACCESS_KEY="<$AWS_SECRET_ACCESS_KEY>"

   SOURCE="/"

   MAX_AGE=1M
   MAX_FULL_BACKUPS=4
   MAX_FULLS_WITH_INCRS=1
   ```
6. Edit `/etc/duply/backup/exclude`:
   ```
   - /proc/*
   - /sys/*
   - /dev/*
   - /mnt/*
   - /tmp/*
   - /var/cache/*
   ```
7. Add cronjobs (`crontab -e`):
   ```
   0 0 * * 7 /usr/bin/duply backup full_verify_purge --force > /var/log/duply.log 2>&1
   0 0 * * 1-6 /usr/bin/duply backup incr > /var/log/duply.log 2>&1
   ```

---
1. [https://www.tech-island.com/tutorials/backup-s3-storage-duplicity-duply](https://www.tech-island.com/tutorials/backup-s3-storage-duplicity-duply)
