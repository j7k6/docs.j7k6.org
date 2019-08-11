---
layout: post
title: "Enable German Keyboard Layout in Xorg"
---

Edit `/etc/X11/xorg.conf.d/10-evdev.conf`:
```
Section "InputClass"
	Identifier "Keyboard Defaults"
	MatchIsKeyboard "yes"
	Option "XkbLayout" "de"
EndSection
```

---
