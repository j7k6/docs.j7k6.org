---
layout: post
title: "Install Debian Packages on Ubiquity EdgeRouter Lite/X"
tags: [debian,ubiquity,edgerouter,edgeos]
---

Since **EdgeOS** is based on *VyOS*, which is based on *Debian*, it's possible to install Debian on *Ubiquity*'s ***EdgeRouter Lite/X***. As always, type `configure` to enter configuration mode.

```
set system package repository wheezy components 'main contrib non-free' 
set system package repository wheezy distribution wheezy 
set system package repository wheezy url http://http.us.debian.org/debian

commit
save
exit
```

Now it's possible to run `apt-get install` to install Debian Packages on EdgeOS. Of course `apt-get update` needs to be run first.

---
