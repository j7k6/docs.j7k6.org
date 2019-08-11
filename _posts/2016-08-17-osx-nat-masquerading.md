---
layout: post
title: "Enable NAT Masquerading on OS X"
---

```bash
echo "nat on <$EXT_INTERFACE> inet from <$INT_NETWORK>/<$INT_NETMASK> to any -> <$EXT_INTERFACE>" | sudo pfctl -v -ef -
```

---
1. [https://discussions.apple.com/message/27406950#message27406950](https://discussions.apple.com/message/27406950#message27406950)
