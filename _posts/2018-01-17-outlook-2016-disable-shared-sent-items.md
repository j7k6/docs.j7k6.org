---
layout: post
title: "Don't Store Sent Items in Shared Folder in Outlook 2016"
tags: [outlook,windows,fix]
---

When using multiple Exchange/Office 365 accounts in Outlook 2016, the *Sent Items* folder is shared by all accounts by default. To use separate *Sent Items* folders for every account, a registry entry has to be created.

1. Open `regedit.exe` (as user)
2. Navigate to `HKEY_CURRENT_USER` > `Software` > `Microsoft` > `Office` > `16` > `Outlook` > `Preferences`
3. Create new **DWORD** entry `DelegateSentItemsStyle` with value `1`
4. Restart Outlook

---
1. [http://www.ugg.li/e-mails-die-in-outlook-von-einem-gemeinsamen-postfach-aus-versendet-werden-landen-nicht-im-gemeinsamen-gesendete-objekte-ordner/](http://www.ugg.li/e-mails-die-in-outlook-von-einem-gemeinsamen-postfach-aus-versendet-werden-landen-nicht-im-gemeinsamen-gesendete-objekte-ordner/)
