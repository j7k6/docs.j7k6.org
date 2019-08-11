---
layout: post
title: "Active Directory Proxy Cache with OpenLDAP"
---

## OpenLDAP Configuration

Edit `/etc/ldap/slapd.conf`:
```
include /etc/ldap/schema/core.schema
include /etc/ldap/schema/cosine.schema
include /etc/ldap/schema/inetorgperson.schema

modulepath /usr/lib/ldap
moduleload back_ldap
moduleload back_mdb
moduleload pcache
moduleload memberof
moduleload rwm

pidfile /var/run/slapd/slapd.pid

backend ldap
database ldap
readonly yes
rebind-as-user
norefs yes

uri "ldap://<$DOMAIN_CONTROLLER>"
suffix "DC=example,DC=com"
rootdn "DC=example,DC=com"

overlay rwm
rwm-map attribute uid sAMAccountName
rwm-map attribute dn distinguishedName

overlay memberof
overlay pcache
pcache mdb 10000 3 1000 100
pcachePersist TRUE

pcacheAttrset 0 *
pcacheTemplate (&(uid=)(memberOf=)) 0 3600
```

## Query AD through Proxy

```bash
ldapsearch -vvv -h localhost -p 389 -D "CN=<$DOMAIN_ADMIN_USERNAME>,CN=Users,DC=example,DC=com" -b "DC=example,DC=com" -w "<$DOMAIN_ADMIN_PASSWORD>" "(&(uid=<$SAMACCOUNTNAME_TO_QUERY>)(memberOf=CN=Users,DC=example,DC=com))"
```

---
1. <https://doc.owncloud.org/server/10.0/admin_manual/configuration/ldap/ldap_proxy_cache_server_setup.html>
2. <https://gist.github.com/tuxfight3r/565dc060d2d5837f7349be9c0a1ea61b>
3. <https://stackoverflow.com/questions/33608276/openldap-as-a-proxy-cache-only-no-local-database>
4. <https://wiki.samba.org/index.php/OpenLDAP_as_proxy_to_AD>
