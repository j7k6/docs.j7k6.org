---
layout: post
title: "Install GhettoVCB on VMware ESXi"
tags: [ghettovcb,vmware,esxi,backup]
---

```bash
esxcli software acceptance set --level=CommunitySupported
esxcli software vib install -d http://vibsdepot.v-front.de -n ghettoVCB --no-sig-check
```

---
