---
layout: post
title: "Reduce Power Consumption on Raspberry Pi Zero"
tags: [raspberry-pi]
---

### Disable HDMI
> This will reduce the power consumption by ~30mA.

Add `/usr/bin/tvservice -o` to */etc/rc.local* (right before the `exit 0` line).

### Disable the ACT LED
> The *ACT* LED indicates network and disk activity, turning it off will reduce the overall power consumption a tiny bit more.

Add these lines to */boot/config.txt*:
```
dtparam=act_led_trigger=none
dtparam=act_led_activelow=off
```

---
1. <https://web.archive.org/web/20151204043226/http://www.midwesternmac.com:80/comment/3216>
2. <https://www.jeffgeerling.com/blogs/jeff-geerling/raspberry-pi-zero-conserve-energy>
