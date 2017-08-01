---
layout: post
title: "Enable SNMP on ESXi"
tags: [vmware,esxi,snmp]
---

```bash
esxcli system snmp set --communities Public
esxcli system snmp set --enable true

esxcli network firewall ruleset set --ruleset-id snmp --allowed-all true
esxcli network firewall ruleset set --ruleset-id snmp --enabled true

/etc/init.d/snmpd restart
```

---
1. [https://serenity-networks.com/how-to-enable-snmp-on-esxi-5-5-5-6-for-remote-monitoring/](https://serenity-networks.com/how-to-enable-snmp-on-esxi-5-5-5-6-for-remote-monitoring/)
