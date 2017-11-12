---
layout: post
title: "Extract files from ADB-created backup.ab"
tags: [android,adb]
---

```bash
( printf "\x1f\x8b\x08\x00\x00\x00\x00\x00" ; tail -c +25 backup.ab ) |  tar xfvz -
```

---
1. [https://android.stackexchange.com/a/78183](https://android.stackexchange.com/a/78183)
