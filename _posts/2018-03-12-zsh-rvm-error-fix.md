---
layout: post
title: "Fix rvm Startup Error in zsh"
tags: [zsh,shell,fix,rvm]
---

### Problem
In a new `zsh` session, those errors appear:

```
/Users/<USER>/.rvm/scripts/initialize:48: __rvm_cleanse_variables: function definition file not found
/Users/<USER>/.rvm/scripts/initialize:50: command not found: rvm_error
```

### Solution
```bash
rm ~/.zcomp*
```

---
1. [https://github.com/robbyrussell/oh-my-zsh/issues/4787#issuecomment-295057045](https://github.com/robbyrussell/oh-my-zsh/issues/4787#issuecomment-295057045)
