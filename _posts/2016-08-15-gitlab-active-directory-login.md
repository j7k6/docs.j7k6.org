---
layout: post
title: "Gitlab Active Directory Login"
tags: [gitlab, active-directory, ldap]
---

`config/gitlab.rb`:
```yaml
...
gitlab_rails['ldap_enabled'] = true
gitlab_rails['ldap_servers'] = YAML.load <<-'EOS'
 main:
   label: 'AD'
   host: '$DOMAIN_CONTROLLER_IP'
   port: 389
   uid: 'sAMAccountName'
   method: 'plain'
   bind_dn: 'CN=$BIND_USER,CN=Users,DC=$DOMAIN,DC=$DOMAIN_TLD'
   password: '$BIND_PASSWORD'
   active_directory: true
   allow_username_or_email_login: true
   block_auto_created_users: false
   base: 'DC=$DOMAIN,DC=$DOMAIN_TLD'
   user_filter: '(memberOf:1.2.840.113556.1.4.1941:=CN=$GITLAB_GROUP,OU=$ORGANIZATIONAL_UNIT,DC=$DOMAIN,DC=$DOMAIN_TLD)'
   attributes:
     username: ['uid', 'userid', 'sAMAccountName']
     email:    ['mail', 'email', 'userPrincipalName']
     name:       'cn'
     first_name: 'givenName'
     last_name:  'sn'
EOS
...
```

---
