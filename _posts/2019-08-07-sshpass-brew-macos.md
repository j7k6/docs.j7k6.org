---
layout: post
title: "Install sshpass via Homebrew on macOS"
---

When running `brew install sshpass` it's failing with an over-protective error message:

> We won't add sshpass because it makes it too easy for novice SSH users to ruin SSH's security.

Thanks, but I will decide that myself!


#### Solution:

```bash
brew install http://git.io/sshpass.rb
```

---
