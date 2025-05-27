---
layout: post
title: 'Stop macOS Photos mediaanalysisd From Wasting Disk Space'
---

```bash
rm -rf ~/Library/Containers/com.apple.mediaanalysisd/Data/Library/Caches
ln -s /dev/null ~/Library/Containers/com.apple.mediaanalysisd/Data/Library/Caches
```

---
