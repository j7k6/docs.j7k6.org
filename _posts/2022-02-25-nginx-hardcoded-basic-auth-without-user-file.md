---
layout: post
title: "Nginx Hardcoded Inline Basic Auth"
---

Sometimes it can be annoying to need an extra `auth_basic_user_file` just for implementing a simple single-user *basic authentication* in Nginx.
So I came up with the idea to "simulate" Nginx' `auth_basic` module. This requires a hardcoded `<$BASIC_AUTH_DIGEST>` string (see [here](/openssl-generate-htpasswd/)):


```
if ($http_authorization != "Basic <$BASIC_AUTH_DIGEST>") {
  return 401;
}

add_header "www-authenticate" "Basic Realm='access denied'" always;
```

---
1. #IfIsEvilMyAss
