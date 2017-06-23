---
layout: post
title: "Fix MacOS Generic NFS Mount Errors"
tags: [macos, nfs, linux]
---

When trying to mount an NFS share on *MacOS* Finder, there might occur a generic *"Opereation not Permitted"* error.
To fix this problem on the client-side, the share has to be mounted from the command line wih the `-o resvport` option: 

```bash
sudo mount_nfs -o resvport 192.168.1.200:/media/data /Volumes/data
```

To be able to mount the share in Finder, the server-side configuration has to be extended with the `insecure` option in */etc/exports*: 

```
/media/data 192.168.1.0/24(rw,insecure,...)
```

---
1. [https://thornelabs.net/2013/10/15/operation-not-permitted-mounting-nfs-share-on-os-x-mountain-lion.html](https://thornelabs.net/2013/10/15/operation-not-permitted-mounting-nfs-share-on-os-x-mountain-lion.html)
