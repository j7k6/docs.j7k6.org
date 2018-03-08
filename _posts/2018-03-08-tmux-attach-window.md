---
layout: post
title: "Attach to Specific Window in Tmux Session"
tags: [tmux]
---

```bash
tmux select-window -t <$WINDOW> \; attach -t <$SESSION>
```

---
1. [https://stackoverflow.com/a/24100903/8434893](https://stackoverflow.com/a/24100903/8434893)
