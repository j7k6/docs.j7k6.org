---
layout: post
title: "Create macOS USB Installer"
tags: [macos]
---

1. Download *macOS* installer from AppStore
2. Copy installer contents to USB drive:
   ```bash
   sudo /Applications/Install\ macOS\ High\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/<$VOLUME_NAME> --applicationpath /Applications/Install\ macOS\ High\ Sierra.app
   ```
3. Unmount volume

---
