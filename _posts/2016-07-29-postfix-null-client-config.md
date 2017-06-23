---
layout: post
title: "Postfix Null Client Config"
tags: [postfix, mail]
---

Edit `/etc/postfix/main.cf`:
```
smtpd_banner = $myhostname ESMTP
myhostname = $HOSTNAME
mydestination =
relayhost =
mynetworks = 127.0.0.0/8
inet_interfaces = loopback-only
inet_protocols = ipv4
```

---
