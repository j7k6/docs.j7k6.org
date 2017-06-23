---
layout: post
title: "Allow Docker in UFW"
tags: [docker, ufw, firewall, ubuntu, linux]
---

Edit: `/etc/default/ufw`:
> ```
> ...
> DEFAULT_FORWARD_POLICY="ACCEPT"
> ```

```bash
service ufw restart
ufw allow in on docker0
ufw allow out on docker0
```

---
