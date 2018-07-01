---
layout: post
title: "Copy PayPal SMS Security Code to macOS Clipboard from Messages.app SQLite Database"
tags: [sms,paypal,security,sqlite,macos]
---

```bash
sqlite3 -ascii ~/Library/Messages/chat.db \
  "SELECT substr(text,32,6) FROM message \
   WHERE text LIKE 'PayPal: Your security code is: %' \
   AND datetime(substr(date,1,9)+978307200,'unixepoch','localtime') > datetime('now','-5 minutes') LIMIT 1" \
| pbcopy
```

---
