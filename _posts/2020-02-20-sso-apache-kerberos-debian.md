---
layout: post
title: " SSO with Apache and Kerberos on Debian"
fav: 1
---

## Prerequirements
### DNS
The server's IP needs a valid DNS record, available in the Active Directory environment.

### Apache
Apache needs to be configured and running before setting up Kerberos.

### Keytab
> The Kerberos Keytab file needs to be generated on a domain controller and transfered to the Debian server afterwards.

1. Create unprivileged Active Directory user (`<$BIND_USER>`).
2. Generate Keytab:
```powershell
ktpass -princ HTTP/test.example.org@EXAMPLE.ORG -mapuser <$BIND_USER>@EXAMPLE.ORG -pass "<$BIND_PASSWORD>" -crypto ALL -ptype KRB5_NT_PRINCIPAL -out c:\krb5.keytab
```
3. Transfer the keytab file to `/etc/krb5.keytab` on the Debian server.

### Packages
Install the reuqired packages on the Debian server:
```bash
apt update
apt install -y libapache2-mod-auth-kerb krb5-user
```

## Server Configuration
### Kerberos
Edit `/etc/krb5.conf`:
```
[libdefaults]
default_realm = EXAMPLE.ORG
		 
[realms]
EXAMPLE.ORG = {
	kdc = dc.example.org
	admin_server = dc.example.org
}

[domain_realm]
.example.org = EXAMPLE.ORG
example.org = EXAMPLE.ORG
```

### Apache
Edit the virtual host's config:

```
<VirtualHost *:443>
  ServerName test.example.org
  ...

  <Location />
    AuthType Kerberos
    AuthName "Kerberos Authentication"
    KrbMethodNegotiate on
    KrbMethodK5Passwd on
    KrbAuthoritative on
    KrbAuthRealms EXAMPLE.ORG
    KrbVerifyKDC off
    Krb5Keytab /etc/krb5.keytab
    KrbServiceName HTTP/test.example.org@EXAMPLE.ORG
    require valid-user
  </Location>
</VirtualHost>
```

## Client Configuration
See [Kerberos Authentication on macOS (SSO)](/sso-macos-kerberos/).

---
