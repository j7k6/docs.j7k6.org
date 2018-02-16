---
layout: post
title: "Use SSH Pubkey with on VMware vCenter Appliance (VCSA)"
tags: [vmware,vsca,ssh]
---

By default, **VCSA** still asks for a login password, even if you set up a SSH pubkey properly in the `authorized_keys` file.
To get rid of the password prompt, just change the default shell to *bash*:

```bash
chsh -s /bin/bash
```

---
1. [http://www.virten.net/2015/10/vcsa6-bash-and-ssh-key-authentication/](http://www.virten.net/2015/10/vcsa6-bash-and-ssh-key-authentication/)
