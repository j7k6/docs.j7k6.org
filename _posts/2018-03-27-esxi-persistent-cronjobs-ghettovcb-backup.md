---
layout: post
title: "Create Persistent Cronjobs on VMware ESXi for ghettoVCB Backups"
tags: [vmware,esxi,cron,backup,ghettovcb]
---

1. Edit `/etc/rc.local.d/local.sh`, insert this before the `exit 0` line:
   ```
   /bin/kill $(cat /var/run/crond.pid)
   /bin/echo "0 21 * * 5 /opt/ghettovcb/bin/ghettoVCB.sh -a -g /vmfs/volumes/<$DATASTORE>/ghettoVCB.conf > /vmfs/volumes/<$BACKUP_DATASTORE>/Backups/ghettoVCB-\$(date +%s).log" >> /var/spool/cron/crontabs/root
   /usr/lib/vmware/busybox/bin/busybox crond
   ```
2. Run the script:
   ```bash
   /bin/sh /etc/rc.local.d/local.sh
   ```
3. Make the changes persistent:
   ```bash
   /bin/auto-backup.sh
   ```

---
