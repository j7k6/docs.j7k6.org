---
layout: post
title: "Fix GnuPG >=2.1 'Inappropriate ioctl for device' Error"
---

```bash
echo "use-agent" >> ~/.gnupg/gpg.conf
echo "pinentry-mode loopback" >> ~/.gnupg/gpg.conf
echo "allow-loopback-pinentry" >> ~/.gnupg/gpg-agent.conf
```

---
1. <https://d.sb/2016/11/gpg-inappropriate-ioctl-for-device-errors>
