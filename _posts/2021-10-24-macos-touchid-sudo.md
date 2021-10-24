---
layout: post
title: "Unlock Sudo with TouchID on macOS"
---

```bash
sudo sed -i ""  -e $'1 a\\\n'"auth sufficient pam_tid.so" /etc/pam.d/sudo
```

---
