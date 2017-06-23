---
layout: post
title: "Get Working Directory in Bash Script"
tags: [bash, shell]
---

```bash
#!/bin/bash

BASEDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
...
```

---
