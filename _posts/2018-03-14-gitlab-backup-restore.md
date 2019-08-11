---
layout: post
title: "Backup/Restore Gitlab"
tags: [gitlab,backup]
---

## Backup
```bash
gitlab-rake gitlab:backup:create
```

## Restore
```bash
gitlab-ctl stop unicorn
gitlab-ctl stop sidekiq
gitlab-rake gitlab:backup:restore BACKUP=<$TIMESTAMP>
gitlab-ctl reconfigure
gitlab-ctl start
gitlab-rake gitlab:check SANITIZE=true
```

*Note*: The `<$TIMESTAMP>` variable does not only mean the unix timestamp in the beginning of the filename, but all the date/time information, **except** `_gitlab_backup.tar`.

---
1. [https://www.fabian-keller.de/blog/migrating-a-gitlab-instance-to-another-server](https://www.fabian-keller.de/blog/migrating-a-gitlab-instance-to-another-server)
