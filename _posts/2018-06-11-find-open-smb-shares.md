---
layout: post
title: "Find Open SMB Shares on Network with Nmap"
tags: [smb,pentesting,security,nmap]
---

```bash
nmap -T4 -v -oA shares --script smb-enum-shares -p445 192.168.1.0/24
```

---
1. <https://highon.coffee/blog/penetration-testing-tools-cheat-sheet/#samba-enumeration>
