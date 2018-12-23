---
layout: post
title: "Use Rsync to Recursively Delete Folder with Many Files Faster"
---

1. Create empty folder:
   ```bash
   mkdir empty
   ```
2. Delete files and folders recursively:
   ```bash
   rsync -a --delete empty/ <$FOLDER_TO_DELETE>
   rm -rf <$FOLDER_TO_DELETE> empty
   ```

---
1. <https://web.archive.org/web/20130929001850/http://linuxnote.net/jianingy/en/linux/a-fast-way-to-remove-huge-number-of-files.html>
