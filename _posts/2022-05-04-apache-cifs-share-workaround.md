---
layout: post
title: "Workaround for Corrupted Files Served by Apache from CIFS Shares"
---

When serving files from a CIFS share, Apache might deliver corrupted files to the client. A simple workaround can fix that issue by either putting the following line in a `.htaccess` file or in the Apache config file:

```
EnableMMAP off
```

---
1. <https://serverfault.com/a/1047215>
