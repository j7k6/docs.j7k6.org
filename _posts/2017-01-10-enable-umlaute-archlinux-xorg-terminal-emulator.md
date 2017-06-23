---
layout: post
title: "Enable Umlaute in ArchLinux/Xorg Terminal Emulators"
tags: [archlinux, xorg, terminal]
---

```bash
cat > /etc/locale.gen << EOF
de_DE.UTF-8 UTF-8  
en_US.UTF-8 UTF-8
EOF


cat > /etc/locale.conf << EOF 
LANG="en_US.utf8"
LC_COLLATE="C"
EOF

locale-gen
reboot
```

---
1. [https://bbs.archlinux.de/viewtopic.php?pid=323643#p323643](https://bbs.archlinux.de/viewtopic.php?pid=323643#p323643)
