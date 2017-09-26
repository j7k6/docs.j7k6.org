---
layout: post
title: "Install Python M2Crypto on macOS"
tags: [python,macos,fix]
---

```bash
brew install openssl
brew install swig
sudo env LDFLAGS="-L$(brew --prefix openssl)/lib" \
  CFLAGS="-I$(brew --prefix openssl)/include" \
  SWIG_FEATURES="-cpperraswarn -includeall -I$(brew --prefix openssl)/include" \
  pip install m2crypto
```

---
1. [https://stackoverflow.com/a/33125400/8434893](https://stackoverflow.com/a/33125400/8434893)
