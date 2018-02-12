---
layout: post
title: "Find & Replace in multiple Files"
tags: [shell, grep]
---

```bash
grep -rli "<$OLD_STRING>" . | \
  xargs -i@ sed -i 's/<$OLD_STRING>/<$NEW_STRING>/g' @
```

---
1. [http://stackoverflow.com/questions/11392478/how-to-replace-a-string-in-multiple-files-in-linux-command-line#comment33720848_20721292](http://stackoverflow.com/questions/11392478/how-to-replace-a-string-in-multiple-files-in-linux-command-line#comment33720848_20721292)
