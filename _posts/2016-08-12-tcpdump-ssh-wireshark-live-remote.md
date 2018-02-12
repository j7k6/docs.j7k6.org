---
layout: post
title: "Live-View TCPdump-Captured Network Traffic from Remote Server in Wireshark through SSH"
tags: [tcpdump, wireshark, ssh, network]
---

```bash
ssh <$USER>@<$SERVER> tcpdump -s0 -w - -U <$FILTER> | wireshark -k -i -
```

---
