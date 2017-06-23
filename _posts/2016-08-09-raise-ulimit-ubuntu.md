---
layout: post
title: "Raise ulimit in Ubuntu"
tags: [ubuntu, linux, ulimit]
---

1. Edit `/etc/security/limits.conf`:
```
*    soft nofile 64000
*    hard nofile 64000
root soft nofile 64000
root hard nofile 64000
```
2. Edit `/etc/pam.d/common-session`:
```
...
session required pam_limits.so
...
```
3. Edit `/etc/pam.d/common-session-noninteractive`
```
...
session required pam_limits.so
...
```
4. Reboot

---
1. [https://underyx.me/2015/05/18/raising-the-maximum-number-of-file-descriptors](https://underyx.me/2015/05/18/raising-the-maximum-number-of-file-descriptors)
