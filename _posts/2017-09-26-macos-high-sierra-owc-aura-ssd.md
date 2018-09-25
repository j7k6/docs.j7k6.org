---
layout: post
title: "Install macOS High Sierra on MacBook with OWC Aura SSD"
tags: [macbook,apple,macos,high-sierra,owc-aura,ssd]
fav: 1
---

At this point the new **macOS High Sierra** is not installable on any **OWC Aura** Macbook SSD. If it's installed via the AppStore directly, it fails with a *Firmware Error*.
I got it to work by doing this:

1. Download Installer in AppStore
2. [Copy High Sierra Installer to bootable USB drive](https://support.apple.com/en-us/HT201372)
3. Boot from USB drive
4. Install High Sierra

This installes a working macOS High Sierra, but doesn't have APFS enable on the SSD.
To convert the SSD into APFS, follow those steps:

1. Boot from USB drive Again
2. Run Disk Utility, select *Macintosh HD*
3. Go to *Edit > Convert to APFS...*
4. Reboot

If macOS doesn't boot, install High Sierra again on the APFS filesystem.

![hs-owc](/files/macos-high-sierra-owc-aura-ssd/hs-owc.png)

---
