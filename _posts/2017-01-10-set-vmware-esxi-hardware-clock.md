---
layout: post
title: "Set VMware ESXi Hardware Clock"
tags: [vmware, esxi]
---

```bash
esxcli system time set -y 2017 -M 01 -d 10 -H 15 -m 20 -s 01
esxcli hardware clock set -y 2017 -M 01 -d 10 -H 15 -m 20 -s 05
```

*Note*: Timezone is UTC

---
1. [http://www.empirion.co.uk/vmware/vmware-how-to-change-the-system-time-on-the-cli/](http://www.empirion.co.uk/vmware/vmware-how-to-change-the-system-time-on-the-cli/)
