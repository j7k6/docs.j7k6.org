---
layout: post
title: "Remap CapsLock Key on macOS"
tags: [macos]
---

*Example:* Remap `[CAPSLOCK]` to `[ESCAPE]`:

```bash
hidutil property --set '{"UserKeyMapping":[{"HIDKeyboardModifierMappingSrc":0x700000039,"HIDKeyboardModifierMappingDst":0x700000029}]}'
```

Apple Keyboard Mapping Codes: <https://developer.apple.com/library/archive/technotes/tn2450/_index.html>

---
1. <http://homeowmorphism.com/articles/17/Remap-CapsLock-Backspace-Sierra>
