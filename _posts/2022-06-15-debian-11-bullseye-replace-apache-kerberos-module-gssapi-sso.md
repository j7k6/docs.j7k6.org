---
layout: post
title: "Replace Deprecated Apache Kerberos Module with GSSAPI on Debian 11 (Bullseye)"
---

Since the `libapache2-mod-auth-kerb` package is not supported on Debian 11 ("*Bullseye*") anymore, a previously working [SSO with Apache and Kerberos](/sso-apache-kerberos-debian/) setup will stop working after upgrading the Debian installation to *Bullseye*.

To fix this problem, the *GSSAPI* module can be used to replace the old Kerberos module. Just `apt install libapache2-mod-auth-gssapi` and change the Apache SSO configuration to:

```
<VirtualHost *:443>
  ServerName test.example.org
  ...

  <Location />
    AuthType GSSAPI 
    AuthName "Kerberos Authentication"
    GssapiBasicAuth On 
    GssapiLocalName On 
    GssapiCredStore keytab:/etc/krb5.keytab
    require valid-user
  </Location>
</VirtualHost>
```

---
