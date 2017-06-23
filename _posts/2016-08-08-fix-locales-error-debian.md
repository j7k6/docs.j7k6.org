---
layout: post
title: "Fix Locales Error in Debian"
tags: [fix, debian, linux, locale]
---

```bash
export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
locale-gen en_US.UTF-8
dpkg-reconfigure locales
```

---
1. [https://www.thomas-krenn.com/de/wiki/Perl_warning_Setting_locale_failed_unter_Debian](https://www.thomas-krenn.com/de/wiki/Perl_warning_Setting_locale_failed_unter_Debian)
