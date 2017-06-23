---
layout: post
title: "Allow ICMP in UFW"
tags: [ubuntu, linux, network, ufw, firewall]
---

Edit: `/etc/ufw/before.rules`:
> ```
> -A ufw-before-output -p icmp -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT
> -A ufw-before-output -p icmp -m state --state ESTABLISHED,RELATED -j ACCEPT
> ```

---
1. [http://www.kelvinism.com/2010/09/enable-icmp-through-ufw_461.html](http://www.kelvinism.com/2010/09/enable-icmp-through-ufw_461.html)
