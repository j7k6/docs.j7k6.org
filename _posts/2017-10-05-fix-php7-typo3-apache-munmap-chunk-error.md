---
layout: post
title: "Fix PHP7/Typo3 crashing Apache with 'munmap_chunk(): invalid pointer' Error"
tags: [php,typo3,apache,fix]
---

Add this line to `php.ini`:

```
pcre.jit=0
```

---
1. [https://stackoverflow.com/a/39535288/8434893](https://stackoverflow.com/a/39535288/8434893)
