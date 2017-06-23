---
layout: post
title: "Unlock OS X Keychain on the Command Line"
tags: [macos]
---

```bash
security unlock-keychain -p "$PASSWORD" "$HOME/Library/Keychains/login.keychain"
```

---
1. [http://stackoverflow.com/a/9678612](http://stackoverflow.com/a/9678612)
