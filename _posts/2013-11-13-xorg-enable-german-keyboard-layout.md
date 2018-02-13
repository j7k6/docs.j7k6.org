---
layout: post
title: "Xorg: Enable German Keyboard Layout"
---

Edit this configuration file and restart the X server.

#####/etc/X11/xorg.conf.d/10-evdev.conf
	Section "InputClass"
		Identifier "Keyboard Defaults"
		MatchIsKeyboard "yes"
		Option "XkbLayout" "de"
	EndSection
