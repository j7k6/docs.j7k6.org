---
layout: post
title: "Install Realtek RTL-8168 NIC Driver on VMware ESXi"
---

```bash
esxcli software acceptance set --level=CommunitySupported
esxcli network firewall ruleset set -e true -r httpClient
esxcli network firewall ruleset set -e true -r dns
esxcli software vib install -d https://vibsdepot.v-front.de -n net55-r8168

reboot
```

---
1. <https://networkguy.de/?p=1910>
