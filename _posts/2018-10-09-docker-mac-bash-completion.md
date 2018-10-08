---
layout: post
title: "Bash Auto-Completion for Docker on macOS"
---

```bash
brew install bash-completion

ln -s /Applications/Docker.app/Contents/Resources/etc/docker.bash-completion $(brew --prefix)/etc/bash_completion.d/
ln -s /Applications/Docker.app/Contents/Resources/etc/docker-compose.bash-completion $(brew --prefix)/etc/bash_completion.d/
. $(brew --prefix)/etc/bash_completion

echo ". \$(brew --prefix)/etc/bash_completion" >> ~/.bash_profile
```

---
