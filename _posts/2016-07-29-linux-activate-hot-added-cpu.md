---
layout: post
title: "Activate Hot-Added CPU in Linux"
tags: [cpu, linux, vmware]
---

```bash
for a in /sys/devices/system/cpu/cpu*/online; do 
  echo "1" > "$a";
done
```

---
1. [https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=1015501](https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=1015501)
