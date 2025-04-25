---
layout: post
title: "Backup Linux System to NFS Share with Rsnapshot"
tags: [rsnapshot,backup,linux,nfs,debian,ubuntu]
---

1. Install required packages:
   ```bash
apt-get update && apt-get install -y nfs-common rsnapshot
   ```
2. Add this line to `/etc/fstab`:
   ```
<$NFS_SERVER>:<$NFS_SHARE>	/mnt/backups	nfs	rw,async	0	0
   ```
3. Mount NFS share:
   ```bash
mkdir -p /mnt/backups
mount /mnt/backups
   ```
4. Edit `/etc/rsnapshot.conf`:
   ```
config_version	1.2
snapshot_root	/mnt/backups
no_create_root	0
cmd_cp			/bin/cp
cmd_rm			/bin/rm
cmd_rsync		/usr/bin/rsync
cmd_logger		/usr/bin/logger
retain			hourly			12
retain			daily			7
retain			weekly			4
retain			monthly			6
exclude			/sys/**
exclude			/dev/**
exclude			/run/**
exclude			/proc/**
exclude			/tmp/**
exclude			/mnt/**
backup			/				./
   ```
   > **Note**: Mind the [TAB]'s, rsnapshot is very picky about them!
5. Add cronjobs (`crontab -e`):
   ```
0 8-20 * * 1-5 /usr/bin/rsnapshot hourly # every work-day, every hour between 8 and 20h
@daily /usr/bin/rsnapshot daily
@weekly /usr/bin/rsnapshot weekly
@monthly /usr/bin/rsnapshot monthly
   ```
6. Manual backup:
   ```bash
rnsapshot daily
   ```

---

### Restore from Backup
```bash
rsync -av /mnt/backups/daily.0/var/lib/. /var/lib/
```
This restores the last daily backup of the `/var/lib` folder.


---
