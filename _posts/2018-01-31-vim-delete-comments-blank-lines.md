---
layout: post
title: "Delete all Commented and Blank Lines in Vim"
tags: [vim]
---

This regex removes all lines starting with '`#`' and all empty lines from a vim buffer/file:

```
:g/\v^(#|$)/d_
```

---
1. [https://stackoverflow.com/a/12662649/8434893](https://stackoverflow.com/a/12662649/8434893)
