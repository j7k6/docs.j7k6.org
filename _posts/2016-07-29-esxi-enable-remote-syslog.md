---
layout: post
title: "Enable Remote Syslog in ESXi"
tags: [vmware, esxi, syslog, logs]
---

1. Enable Remote Syslog:
```sh
esxcli system syslog config set --loghost='udp://<$SYSLOG_SERVER>:514'
esxcli system syslog reload
```

2. Enable Firewall Rule:
```sh
esxcli network firewall ruleset set --ruleset-id=syslog --enabled=true
esxcli network firewall refresh
```

3. Disable Remote Syslog:
```sh
esxcli system syslog config set --loghost=''
esxcli system syslog reload
```

---
