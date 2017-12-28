---
layout: post
title: "Move Running Process to Tmux on Linux"
tags: [linux,shell,tmux,reptyr]
---

This works if you want to move a running process to a *Tmux*  session (requires `reptyr`):

1. Suspend process: press `Ctrl+Z`
2. Resume process in background: `bg`
3. Disown process: `disown %1`
4. Launch *Tmux*
5. Find PID: `ps a | grep <PROCESS_NAME>`
6. Resume process in *Tmux*: `reptyr <PID>`

---
1. [https://twitter.com/TimMedin/status/946437434933501953](https://twitter.com/TimMedin/status/946437434933501953)
