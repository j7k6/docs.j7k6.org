---
layout: post
title: "Fix 'Failed to start Fail2Ban Service' Error on Ubuntu"
tags: [fail2ban,linux,ubuntu,fix]
---

## Problem:
When installing `fail2ban` on a fresh and clean Ubuntu (>=16.04), it fails starting the service and throws errors whenever an other packet is installed with `apt`. The reason for this is that the `fail2ban` Ubuntu package isn't configured for `systemd` by default, but relies on the old way of reading log-files from `/var/log/`.

## Workaround:
When running `journalctl -u fail2ban.service` it will say: *ERROR  No file(s) found for glob /var/log/auth.log* somewhere.
This means `syslogd` is missing. Install it so that the `auth.log` files is generated. Then restart the `fail2ban` service:

```
apt-get install -y inetutils-syslogd
systemctl restart fail2ban
```

## Solution:
The proper solution is to set the `fail2ban` backend to `systemd`.
In `/etc/fail2ban/jail.conf` set `backend = systemd` and restart the service.

---
1. [https://unix.stackexchange.com/a/271376](https://unix.stackexchange.com/a/271376)
2. [https://unix.stackexchange.com/a/335528](https://unix.stackexchange.com/a/335528)
