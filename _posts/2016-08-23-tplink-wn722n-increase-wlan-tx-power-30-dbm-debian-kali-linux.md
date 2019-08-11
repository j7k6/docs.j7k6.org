---
layout: post
title: "TPLink WN722N: Increase WLAN TX Power to 30 dBm on Debian/Kali Linux"
---

> **Disclaimer**: This might be illegal in some countries.

```bash
apt-get install python-m2crypto libgcrypt11-dev libnl-3-dev libnl-genl-3-dev
curl -sSL https://www.kernel.org/pub/software/network/crda/crda-3.18.tar.xz | tar xJf -
curl -sSL https://www.kernel.org/pub/software/network/wireless-regdb/wireless-regdb-2016.06.10.tar.xz | tar xJf -
cd wireless-regdb-2016.06.10
sed -i '/country CN/{n;s/20/30/}' db.txt
make
mv /lib/crda/regulatory.bin /lib/crda/regulatory.bin.old
cp regulatory.bin /lib/crda/
chmod +x /lib/crda/regulatory.bin
cp root.key.pub.pem ../crda-3.18/pubkeys/
cp /lib/crda/pubkeys/*.pem ../crda-3.18/pubkeys/
cd ../crda-3.18
sed -i 's/\/usr//' Makefile
sed -i 's/-Werror//' Makefile
make
make install
reboot
```

---
1. <http://askubuntu.com/questions/597546/iwconfig-wlan0-txpower-30mw-not-working>
