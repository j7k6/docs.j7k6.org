---
layout: post
title: "nginx: Password Protected Directories"
---

###Configure Virtual Host
#####/etc/nginx/sites-available/\<DOMAIN\>
	location /secret/ {
	 auth_basic "Top Secret!";
	 auth_basic_user_file /etc/nginx/htpasswd;
	}
```bash
service nginx restart
```

###Add User
```bash
echo -n "<USER>:" > /etc/nginx/htpasswd
openssl passwd -crypt >> /etc/nginx/htpasswd
```
