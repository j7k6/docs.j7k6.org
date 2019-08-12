---
layout: post
title: "Download Files recursively from FTP with wget"
---

```bash
wget -r -l inf -nH -nc --restrict-file-names=nocontrol ftp://<$USER>:'<$PASSWORD>'@<$SERVER>/
```

---
