---
layout: post
title: "Fix Zabbix Error 'snmp_parse_oid(): cannot parse OID IF-MIB::ifDescr'"
tags: [zabbix,snmp,fix]
---

```bash
apt-get install snmp-mibs-downloader
systemctl restart zabbix-server
```

---
1. [https://e3fi389.wordpress.com/2016/03/28/zabbix-error-in-autodiscovery-function-snmp_parse_oid-cannot-parse-oid-if-mibifdescr/](https://e3fi389.wordpress.com/2016/03/28/zabbix-error-in-autodiscovery-function-snmp_parse_oid-cannot-parse-oid-if-mibifdescr/)
