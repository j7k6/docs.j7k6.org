---
layout: post
title: "MariadDB Installation on Debian/Ubuntu"
---

```bash 
apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xF1656F24C74CD1D8
add-apt-repository 'deb [arch=amd64,arm64,i386,ppc64el] http://mirror.netcologne.de/mariadb/repo/10.3/ubuntu xenial main'
apt-get update
debconf-set-selections <<< 'mariadb-server-10.3 mysql-server/root_password password <$MYSQL_ROOT_PASSWORD>'
debconf-set-selections <<< 'mariadb-server-10.3 mysql-server/root_password_again password <$MYSQL_ROOT_PASSWORD>'
apt-get install -y mariadb-server
```

---
