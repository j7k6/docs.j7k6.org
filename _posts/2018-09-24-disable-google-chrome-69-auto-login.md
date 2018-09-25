---
layout: post
title: "Disable Google Auto-Login in Chrome 69+ on macOS"
---

```bash
defaults write com.google.Chrome SyncDisabled -bool true
defaults write com.google.Chrome RestrictSigninToPattern -string ".*@example.com"
```

---
1. <https://blog.ideasynthesis.com/2018/09/24/Disable-Google-Chrome-Sign-In-and-Sync/>
