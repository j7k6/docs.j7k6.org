---
layout: post
title: "Download Extensions from Chrome Web Store Manually"
---

`curl -o <$EXTENSION_NAME>.crx -fsSL "https://clients2.google.com/service/update2/crx?response=redirect&prodversion=<$CHROME_VERSION>&x=id%3D<$EXTENSION_ID>%26uc"`

Example '**uBlock Origin**':
```bash
curl -o ublock.crx -fsSL "https://clients2.google.com/service/update2/crx?response=redirect&prodversion=69.0.3497.100&x=id%3Dcjpalhdlnbpafiamejdnhcphjbkeiagm%26uc"
unzip ublock.crx -d ublock/
```

---
