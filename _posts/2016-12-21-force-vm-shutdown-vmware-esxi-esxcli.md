---
layout: post
title: "Force VM Shutdown on VMware ESXi with esxcli"
---

1. List VMs: `esxcli vm process list`
2. Force Shutdown: `esxcli vm process kill --type=force --world-id=<$WORLD_ID>`

---
1. <https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=1014165>
