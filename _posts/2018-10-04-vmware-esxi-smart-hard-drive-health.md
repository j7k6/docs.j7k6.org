---
layout: post
title: "Monitor S.M.A.R.T. Hard Drive Health Status on VMware ESXi"
---

1. List hard drives:
   ```bash
   esxcli storage core device list
   ```
2. Show S.M.A.R.T. information:
   ```bash
   esxcli storage core device smart get -d <$DRIVE>
   ```

---
