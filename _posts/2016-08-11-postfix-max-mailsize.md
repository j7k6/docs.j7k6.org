---
layout: post
title: "Change Maximum Mailsize in Postfix"
---

Edit `/etc/postfix/main.cf`:
```
message_size_limit = 20480000
```

---
