---
layout: post
title: "Kubectl: File Copy Progress"
---

`kubectl cp` doesn't show any progress when copying files to, from or between pods. Under the hood the command just uses plain old `tar`, so it can be easily reproduced by using just the `tar` command. This can be piped to  `pv` to show the progress of the copy operation (install `pv` via package manager first):

```bash
tar cf - -C <$SOURCE_PARENT_PATH> . | pv | kubectl exec -i <$TARGET_POD> -- tar xf - -C <$TARGET_PARENT_PATH>
```

---
