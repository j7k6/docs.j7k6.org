---
layout: post
title: "Install macOS 10.14 Mojave on a MacBook Pro with OWC Aura SSD"
fav: 1
---

Upgrading to *macOS 10.14 Mojave* on a MacBook Pro with a **OWC Aura** replacement SSD may result in the following error:
> macOS cannot be installed because the third-party storage installed in your Mac is not compatible. Please contact the supplier directly for assistance.

![macos-10-14-mojave-owc-aura-ssd](/files/macos-10-14-mojave-owc-aura-ssd.png)

This problem can be fixed by flashing a firmware update to the SSD controller first.
Follow the steps in this [Knowledgebase Article](https://eshop.macsales.com/Service/Knowledgebase/Article/10/730/Aura-SSDs-Firmware-Update) to perform the storage controller firmware update and try to install *Mojave* again after rebooting.

---
1. <https://apple.stackexchange.com/a/325148>
