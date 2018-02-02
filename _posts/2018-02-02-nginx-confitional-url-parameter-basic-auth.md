---
layout: post
title: "Use Conditional URL Parameter to Bypass Basic Auth in Nginx"
tags: [nginx,basic-auth]
---

If visitors with a custom parameter appended to the URL (e.g. `?noauth=1`) shall be able to bypass a basic auth login, this is how the *Nginx* site config should look like:

```
...
# set the default: activate basic auth
set $auth "Restricted";

# if get parameter noauth=1, bypass basic auth and set cookie
if ($arg_noauth = 1) {
  set $auth "off";
  add_header Set-Cookie "noauth=1";
}

# if cookie is set, bypass basic auth
if ($cookie_noauth = 1) {
  set $auth "off";
}

auth_basic $auth;
...
```

---
