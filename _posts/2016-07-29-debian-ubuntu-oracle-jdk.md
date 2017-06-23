---
layout: post
title: "Install Oracle JDK (Java) on Debian/Ubuntu"
tags: [java, debian, ubuntu, linux]
---

```bash
mkdir -p /opt/java
curl -b 'oraclelicense=accept-securebackup-cookie' -L 'http://download.oracle.com/otn-pub/java/jdk/8u92-b14/jdk-8u92-linux-x64.tar.gz' | tar xz -C /opt/java
update-alternatives --remove-all java
update-alternatives --remove-all javac
update-alternatives --install /usr/bin/java java /opt/java/jdk1.8.0_92/bin/java 1
update-alternatives --install /usr/bin/javac javac /opt/java/jdk1.8.0_92/bin/javac 1
```

---
