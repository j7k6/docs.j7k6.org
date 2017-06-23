---
layout: post
title: "Enable Nginx Logs in Goaccess"
tags: [logs, nginx, goaccess]
---

Add to `/etc/goaccess.conf`:

```bash
time-format %T
date-format %d/%b/%Y
log-format %h %^[%d:%t %^] "%r" %s %b "%R" "%u"
```

---
