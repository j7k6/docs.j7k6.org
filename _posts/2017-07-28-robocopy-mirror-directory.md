---
layout: post
title: "Mirror Directories with Robocopy"
tags: [windows,backup,robocopy]
---

Copy without attributes:
```powershell
robocopy <SOURCE> <TARGET> /MIR /W:0 /R:0 /COPY:DT /DCOPY:T
```

Copy with attributes:
```powershell
robocopy <SOURCE> <TARGET> /MIR /W:0 /R:0 /COPY:DAT
```

---
