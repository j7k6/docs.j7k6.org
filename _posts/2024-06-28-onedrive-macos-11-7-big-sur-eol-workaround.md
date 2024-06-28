---
layout: post
title: 'OneDrive Client for macOS 11.7 Big Sur EOL Workaround'
fav: 1
---

Crooked Microsoft is forcing customers to upgrade their Apple hardware if they want to continue to keep the OneDrive client working. When the *Microsoft AutoUpdater* is set to 'automatic', it installs an incompatible version of the client over a working one. This version won't start on *macOS 11.7 ("Big Sur")* because its minimum requirement is *macOS 12.3 ("Monterey")*, which doesn't support older MacBooks like the popular 2014 MacBook Air.

There is a workaround (for now):

1. Run *Microsoft AutoUpdater* and disable all automatic updates.
2. Remove the incompatible *OneDrive.app* from the *Application* folder.
3. Download and install the latest compatible version of the OneDrive client ([https://oneclient.sfx.ms/Mac/Installers/24.086.0428.0003/universal/OneDrive.pkg](https://oneclient.sfx.ms/Mac/Installers/24.086.0428.0003/universal/OneDrive.pkg)) 

This should keep OneDrive working until Microsoft decides to kill the support for that version on the server-side.

---
