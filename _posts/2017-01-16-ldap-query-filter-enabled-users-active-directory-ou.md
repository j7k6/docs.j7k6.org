---
layout: post
title: "LDAP Query to Filter enabled Users in Active Directory OU"
tags: [ldap, active-directory]
---

```
(memberOf:1.2.840.113556.1.4.1941:=CN=admins,OU=security,DC=test,DC=org)
```

---
