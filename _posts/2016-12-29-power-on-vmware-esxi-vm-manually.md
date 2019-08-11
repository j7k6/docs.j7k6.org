---
layout: post
title: "Power-on VM on VMWare ESXi manually"
---

1. List VMs to get `<$VM_ID>`:
   ```bash
   vim-cmd vmsvc/getallvms
   ```
2. Power-on VM:
   ```bash
   vim-cmd vmsvc/power.getstate `<$VM_ID>`
   ```
 
---
1. [https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=1038043](https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=1038043)
