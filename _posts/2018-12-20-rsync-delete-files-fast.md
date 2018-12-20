---
layout: post
title: "Fast Delete Big Folder with Many Files Recursively with Rsync"
---

1. Create empty folder:
   ```bash
   mkdir empty
   ```
2. Delete files and folders recursively:
   ```bash
   rsync -a --delete empty/ <$FOLDER_TO_DELETE>
   ```

---
1. <https://web.archive.org/web/20130929001850/http://linuxnote.net/jianingy/en/linux/a-fast-way-to-remove-huge-number-of-files.html>
