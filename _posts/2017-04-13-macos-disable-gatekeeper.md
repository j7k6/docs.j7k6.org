---
layout: post
title: "Disable Gatekeeper in macOS"
tags: [macos, security]
---

In macOS Sierra the setting for "*Allow apps download from*" is missing the *Anywhere* option. To fix this, Gatekeeper needs to be disabled.

1. Close *System Preferences*
2. Run `sudo spctl --master-disable`
3. Now the *Anywhere* option shows up and is selected automatically in the *System Preference -> Security & Privacy*-panel

> *Note*: To re-enable Gatekeeper, run `sudo spctl --master-enable`.

---
1. [https://www.tekrevue.com/tip/gatekeeper-macos-sierra/](https://www.tekrevue.com/tip/gatekeeper-macos-sierra/)
