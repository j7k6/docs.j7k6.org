---
layout: post
title: "Create MacOS Admin Account without Admin User in Single User Mode"
---

1. On boot, press `cmd + S` to enter single user mode.
2. Run
   ```bash
   mount -uw /
   rm /var/db/.AppleSetupDone
   ```
3. Continue boot process by pressing `ctrl + D`.
4. Finish the setup wizard to create a new admin user.

---
1. <https://apple.stackexchange.com/a/164333>
