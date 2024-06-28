---
layout: post
title: 'OneDrive Client for macOS 11.7 Big Sur EOL Workaround'
fav: 1
---

Crooked Microsoft is forcing customers to upgrade their Apple hardware if they want to continue to keep the OneDrive client working. Microsoft is forcing an automatic update to an incompatible version of the client over a working one. This version won't start on *macOS 11.7 ("Big Sur")* because its minimum requirement is *macOS 12.3 ("Monterey")*, which doesn't support older MacBooks like the popular 2014 MacBook Air.

There is a workaround (for now):

1. Remove the incompatible *OneDrive.app* from the *Application* folder.
2. Download and install the latest compatible version of the OneDrive client ([v24.086.0428.0003](https://oneclient.sfx.ms/Mac/Installers/24.086.0428.0003/universal/OneDrive.pkg)) 
3. Add those hostnames to `/etc/hosts` to block Microsoft from updating the app again:
   ```
   127.0.0.1 oneclient.sfx.ms
   127.0.0.1 g.live.com
   ```

This should keep OneDrive working until Microsoft decides to kill the support for that version on the server-side.

---
