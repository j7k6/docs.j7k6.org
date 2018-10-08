---
layout: post
title: "Reset Failed Login Attempts/Account Logout on VMware ESXi"
---

**Background**: When having *ESXi*'s SSH port exposed to the internet for more than 10 minutes, chances are high that there are multiple attempts to brute force the `root` account's password. This will lead to a locked `root` account, unable to login via password, not only for SSH but also for the vSphere Web Interface.

**Workaround**: The account lock can be bypassed on SSH by logging in via private-key auth. To remove the account lock run:

```bash
pam_tally2 --user root --reset
```

---
1. <https://discoposse.com/2017/10/09/resetting-vsphere-6-x-esxi-account-lockouts-via-ssh/>
