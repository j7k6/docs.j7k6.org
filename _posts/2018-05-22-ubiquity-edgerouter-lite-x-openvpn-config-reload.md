---
layout: post
title: Reload OpenVPN Configuration File on EdgeRouter Lite/X
tags: [ubiquity,edgerouter-lite,edgerouter-x,openvpn,edgeos]
---

When using *OpenVPN* on an *Ubiquity* ***Edgerouter Lite/X***, there is no straight-forward way to reload the OpenVPN daemon when a configuration file is changed.
To reload the OpenVPN daemon after a configuration change, type `configure` and then reconfigure the `vtunX` interface:

```
delete interfaces openvpn vtun0
commit
set interfaces openvpn vtun0 config-file <$OPENVPN_CONFIG_FILE>
commit
save
```

---
1. [https://community.ubnt.com/t5/EdgeRouter/Better-way-to-restart-OpenVPN/m-p/1019067/highlight/true#M42737](https://community.ubnt.com/t5/EdgeRouter/Better-way-to-restart-OpenVPN/m-p/1019067/highlight/true#M42737)
