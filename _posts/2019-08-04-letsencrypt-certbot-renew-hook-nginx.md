---
layout: post
title: "Certbot Renewal Hook for Nginx"
---

In newer version of `certbot` cronjobs are not being used anymore to renew certificates. Instead it uses `systemd` timers for certificate renewals. So attaching renewal hooks to the exisiting cronjob won't work anymore. Instead the hooks are now located in `/etc/letsencrypt/cli.ini`:

```
renew-hook = systemctl reload nginx
```

---
