---
layout: post
title: "Minimal Mutt IMAP Config"
tags: [mutt,email,imap]
---

```
set from = "<$FROM_ADDRESS>"
set realname = "<$FROM_NAME>"

set imap_user = "<$IMAP_USERNAME>"
set imap_pass = "<$IMAP_PASSWORD>"

set smtp_url = "smtp://$imap_user:$imap_pass@<$IMAP_SERVER>:587/"
set ssl_starttls = yes
set ssl_force_tls = yes

set mail_check = 60

set folder = "imaps://<$IMAP_SERVER>:993"
set spoolfile = "+INBOX"
set record = "+Sent"
set postponed = "+Drafts"
set trash = "+Trash"

set move = no
set sort = "threads"
set sort_aux = "reverse-last-date-received"

set header_cache = "~/.mutt/cache/headers"
set message_cachedir = "~/.mutt/cache/bodies"
```

---
1. <https://blog.mafr.de/2009/09/08/imap-configuration-for-mutt/>
