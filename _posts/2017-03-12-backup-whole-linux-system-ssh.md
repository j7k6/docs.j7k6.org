---
layout: post
title: "Backup & Restore whole Linux System over SSH"
tags: [linux, ssh, backup, tar]
---

### Backup
```bash
ssh root@<$SSH_HOST> "tar cpf - / --exclude=/sys --exclude=/proc --exclude=/dev" | pv | gzip | cat > backup.tar.gz
```

### Restore
```bash 
cat backup.tar.gz | ssh root@<$SSH_HOST> "pv | tar zxvf - -C /"
```

---
