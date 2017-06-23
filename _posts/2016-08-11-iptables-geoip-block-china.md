---
layout: post
title: "GeoIP Block China with IPTables"
tags: [network, linux, iptables]
---

```bash
apt-get install xtables-addons-common libtext-csv-xs-perl

mkdir /usr/share/xt_geoip
/usr/lib/xtables-addons/xt_geoip_dl
/usr/lib/xtables-addons/xt_geoip_build  -D /usr/share/xt_geoip  *.csv

modprobe xt_geoip

iptables -A INPUT -m geoip --src-cc CN -j DROP
```

---
1. [http://mikhailian.mova.org/node/238](http://mikhailian.mova.org/node/238)
