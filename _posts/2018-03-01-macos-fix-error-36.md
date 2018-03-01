---
layout: post
title: "Fix 'Error: -36' when Copying Files on macOS"
tags: [macos,fix]
---

Copying files from/to (SMB) Windows shares or USB drives on *macOS* can sometimes lead to **Error: -36**, which means that the system has a problem with the dotfiles ('`._`') on the volume.
To fix the error, just run the `dot_clean` command in the terminal:

```bash
dot_clean /Volumes/<$VOLUME>
```

---
