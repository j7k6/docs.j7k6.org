---
layout: post
title: "My Minimal Tmux Setup"
tags: [tmux]
---

As a sequel to ['*My Minimal .vimrc*'](/my-minimal-vimrc/), this is a little write-up about my **Tmux** setup, which I also like to keep as simple as possible.

In my traditional minimalistic approach to only use the config I *understand* and *need*, my `.tmux.conf` is not much longer than **30 SLOC**...


## General Settings
It starts with the usual rebinding of the *Prefix key*, which is `Ctrl+B` by default, but I guess 99% of all *Tmux* users change it to `Ctrl+A` for some good reason (it's the same in `screen`, it's easier to type...):

```
set -g prefix C-a                         # prefix key
set -g default-terminal "screen-256color" # terminal type
set -g aggressive-resize on               # aggressive resize
set -sg escape-time 0                     # escape time
set -g base-index 1                       # set initial window index to 1
set -g mouse on                           # enable mouse support
set -g bell-action none                   # disable bell
setw -g xterm-keys on                     # enable xterm keys
setw -g mode-keys vi                      # enable vi mode keys
```

the last line (`mode-keys vi`) is very important to me, because it makes *vim*-style key-actions possible in *Tmux*! This awesome feature makes Copy & Pasting from inside *Tmux* to whatever application really simple. It basically works like the *vim* *Visual Mode*.


## Vim-like Copy & Paste
To get into *vim*-mode, just press the `Esc`-key (or `PgUp|Down`) after the *prefix key*. All the *vim* key-combinations work here (`v`, `V`, `y`, `yy`,...).
```
bind Escape copy-mode
bind p paste-buffer
bind -T copy-mode-vi v send -X begin-selection
bind -T copy-mode-vi y send-keys -X copy-pipe-and-cancel "pbcopy"
bind -T copy-mode-vi MouseDragEnd1Pane send-keys -X copy-pipe-and-cancel "pbcopy"
bind -T copy-mode-vi Enter send-keys -X copy-pipe-and-cancel "pbcopy"
```


## Status Bar
Like in *vim* (no statusline, ruler only), I also choose to go an unorthodox path by having the *Tmux* status bar in the top of the screen. This way it doesn't intefere visually with my *vim* ruler line and it's also more like the menu bar in macOS (top) then the task bar in Windows (bottom).

```
set -g status-position top               # statusbar position
set -g status-interval 1
set -g window-status-format '#I:#(pwd="#{pane_current_path}"; echo ${pwd####*/})'
set -g window-status-current-format '[#I:#(pwd="#{pane_current_path}"; echo ${pwd####*/})]'
set -g status-right-length 120
set -g status-right '#(date +"%b %_d %H:%M") | #(whoami)@#(hostname -s) '
set -g window-status-current-attr bold
```

The *status bar* is also kept pretty much as simple as possible. Only extra inforamtion are date/time display and `username@hostname` (so I know where I am).


## Key Bindings
I only use a handful of key bindings for splitting windows, create and close windows and panes. Nothing fancy.

```
bind ! split-window -h -c "#{pane_current_path}" # split horizontally
bind - split-window -v -c "#{pane_current_path}" # split vertically
bind n new-window                                # open new window
bind x kill-pane                                 # kill pane without confirmation
bind k kill-window                               # kill window
bind q kill-session                              # kill session
bind r source-file ~/.tmux.conf                  # reload tmux config
bind t select-layout tiled                       # tiled layout
```

## Extras
And this is the end of my `.tmux.conf`.
The last line checks if I'm in a SSH session and paints the status bar red to remind me that I might be ind dangerous places: 

```
if-shell 'test "$SSH_CONNECTION"' 'set -g status-bg red'
```

---
1. [My Dotfiles Repo](https://github.com/johnnyraccoon/dotfiles)
