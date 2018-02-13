---
layout: post
title: "ZyXEL NSA325: SABnzbd & SickBeard & CouchPotato"
tags: [zyxel-nsa325,sabnzbd,sickbeard,couchpotate]
---

## Install FFP
See [*here*](/zyxel-nsa325-ffp).

## Required packages
```bash
slacker -AUui br2:python memiks:par2cmdline memiks:setuptools memiks:unrar mz:sqlite s:binutils s:gcc s:linux-headers s:make s:mpfr s:uClibc
```

## Python modules
```bash
easy_install CherryPy Cheetah pyOpenSSL https://bitbucket.org/dual75/yenc/get/a9bae29465ad.tar.gz
```

## Download & Install applications
```bash
wget https://github.com/midgetspy/Sick-Beard/archive/master.zip -O sickbeard.zip
wget https://github.com/sabnzbd/sabnzbd/archive/master.zip -O sabnzbd.zip
wget https://github.com/RuudBurger/CouchPotatoServer/archive/master.zip -O couchpotato.zip
```

```bash
unzip sickbeard.zip
unzip sabnzbd.zip
couchpotato.zip

mv Sick-Beard-master /ffp/share/sickbeard
mv sabnzbd-master /ffp/share/sabnzbd
mv CouchPotatoServer-master/ /ffp/share/couchpotato
```

## Start installed applications
> **Note:** Start each application once, and proceed the initial setup routine on the web interface, than kill the process (`CTRL+C`).

```bash
python /ffp/share/sabnzbd/SABnzbd.py -b0 -s 0.0.0.0:8080 -f /ffp/share/sabnzbd/sabnzbd.ini
python /ffp/share/sickbeard/SickBeard.py --port 8081
python /ffp/share/couchpotato/CouchPotato.py --data_dir /ffp/share/couchpotato --config_file /ffp/share/couchpotato/settings.conf
```

> **Hint:** CouchPotato will throw an "Internal Server Error" after the initial configuration. This can be ignored, just kill the process. The error will be gone at the next start.

## Startup scripts
Edit `/ffp/start/sabnzbd.sh`:
```
#!/ffp/bin/sh
# PROVIDE: sabnzbd
# REQUIRE: LOGIN
python /ffp/share/sabnzbd/SABnzbd.py -d -f /ffp/share/sabnzbd/sabnzbd.ini
```

Edit `/ffp/start/sickbeard.sh`:
```
#!/ffp/bin/sh
# PROVIDE: sabnzbd
# REQUIRE: LOGIN
python /ffp/share/sickbeard/SickBeard.py --daemon
```

Edit `/ffp/start/couchpotato.sh`:
```
#!/ffp/bin/sh
# PROVIDE: sabnzbd
# REQUIRE: LOGIN
python /ffp/share/couchpotato/CouchPotato.py --data_dir /ffp/share/couchpotato --config_file /ffp/share/couchpotato/settings.conf --daemon
```

```bash
chmod +x /ffp/start/sabnzbd.sh
chmod +x /ffp/start/sickbeard.sh
chmod +x /ffp/start/couchpotato.sh
```

---
1. [http://zyxel.nas-central.org/wiki/SABnzdb](http://zyxel.nas-central.org/wiki/SABnzdb)
