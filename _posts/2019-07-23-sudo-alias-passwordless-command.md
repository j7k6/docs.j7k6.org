---
layout: post
title: "Allow Sudo User Passwordless Command Execution"
---

**Example:** Allow *deploy* user to restart *Nginx* service without having to enter a password. Create `/etc/sudoers.d/nginx`:

```
Cmnd_Alias NGINX_RESTART = /bin/systemctl restart nginx
Cmnd_Alias NGINX_RELOAD  = /bin/systemctl reload nginx
Cmnd_Alias NGINX_STOP  = /bin/systemctl stop nginx

deploy ALL=NOPASSWD: NGINX_RESTART, NGINX_RELOAD, NGINX_STOP
```

---
