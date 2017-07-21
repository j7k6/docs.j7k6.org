---
layout: post
title: "Backup & Restore ESXi Configuration"
tags: [backup,vmware,esxi]
---

## Backup
```bash
vim-cmd hostsvc/firmware/sync_config
vim-cmd hostsvc/firmware/backup_config
```

## Restore
```bash
vim-cmd hostsvc/maintenance_mode_enter
vim-cmd hostsvc/firmware/restore_config <CONFIG_BUNDLE>
```

---
1. [https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=2145148](https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=2145148)
