---
layout: post
title: "AWK Cheat Sheet"
tags: [awk]
---

## Strip First Character from First Column
```bash
awk '{print substr($1,2)}'
```

## Replace
```bash
awk '{gsub(/REGEX/, "NEW"); print}'
```

## Print Only Non-empty Lines
```bash
awk 'NF' file
```

---
