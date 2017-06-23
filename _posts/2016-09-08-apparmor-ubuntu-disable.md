---
layout: post
title: "Disable AppArmor on Ubuntu Server"
tags: [ubuntu, linux, apparmor]
---

```bash
/etc/init.d/apparmor stop
update-rc.d -f apparmor remove
apt-get remove -y --purge apparmor apparmor-utils
```

---
