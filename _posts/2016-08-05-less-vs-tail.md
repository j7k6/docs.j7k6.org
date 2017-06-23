---
layout: post
title: "Use 'less +F' instead of 'tail -f'"
tags: [less, tail]
---

```bash
less +F --follow-name /var/log/mail.log
```

- `ctrl+c` to stop streaming logfile
- `/` to search
- `F` to continue streaming logfile

---
1. [https://www.linux.com/blog/tail-f-vs-less-f](https://www.linux.com/blog/tail-f-vs-less-f)
