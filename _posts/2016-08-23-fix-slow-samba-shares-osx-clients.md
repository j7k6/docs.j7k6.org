---
layout: post
title: "Fix Slow Samba Shares on OS X Clients"
---

Edit `smb.conf` on Server:

```
[share]
  ...
   vfs objects = fruit streams_xattr
```

---
1. [http://plazko.io/apple-osx-finder-is-listing-files-very-very-slow-when-connected-to-smb-shared-hard-drive-connected-to-a-wifi-router/](http://plazko.io/apple-osx-finder-is-listing-files-very-very-slow-when-connected-to-smb-shared-hard-drive-connected-to-a-wifi-router/)
