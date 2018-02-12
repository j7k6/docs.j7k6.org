---
layout: post
title: "Test Secure IMAP with OpenSSL"
tags: [imap, ssl]
---

```bash
openssl s_client -crlf -connect <$SERVER>:993
```

```
# login
A login <$USER> <$PASSWORD>

# show message count
A status INBOX (messages)

# read message body
A fetch <$MESSAGE_ID> rfc822.text

# read message header
A fetch <$MESSAGE_ID> rfc822.header
```

---
1. [http://www.unixwitch.de/de/sysadmin/tools/imap-mit-ssl-testen](http://www.unixwitch.de/de/sysadmin/tools/imap-mit-ssl-testen)
