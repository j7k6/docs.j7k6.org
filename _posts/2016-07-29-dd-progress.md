---
layout: post
title: "dd with Progress"
tags: [dd]
---

### On Linux with `coreutils` >= **v8.24**:
```bash
dd if=$IN_FILE of=$OUT_FILE status=progress
```

### On older Linux (requires `pv`):
```bash
dd if=$IN_FILE | pv | dd of=$OUT_FILE
```

### OS X / macOS: press
`CTRL` + `T`

---
