---
layout: post
title: "Enable Docker Shell Completion for zsh on macOS"
tags: [docker,macos,shell,zsh]
---

1. Symlink files:
   ```
   ln -s /Applications/Docker.app/Contents/Resources/etc/docker.zsh-completion /usr/local/share/zsh/site-functions/_docker
   ln -s /Applications/Docker.app/Contents/Resources/etc/docker-machine.zsh-completion /usr/local/share/zsh/site-functions/_docker-machine
   ln -s /Applications/Docker.app/Contents/Resources/etc/docker-compose.zsh-completion /usr/local/share/zsh/site-functions/_docker-compose
   ```
2. Make sure this line exists in `~/.zshrc`:
   ```
   autoload -Uz compinit && compinit
   ```

---
1. [https://github.com/docker/for-mac/issues/1948#issuecomment-348854945](https://github.com/docker/for-mac/issues/1948#issuecomment-348854945)
