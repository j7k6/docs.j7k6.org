---
layout: post
title: "Convert LDAP User to Local User in Gitlab"
tags: [gitlab, ldap]
---

1. Run `gitlab-rails dbconsole` to remove the LDAP identity:
   ```sql
   SELECT * FROM identities;
   DELETE FROM identities WHERE id=<$USER_ID>;
   \q
   ```
2. Run `gitlab-rails console` to set a new password for the user:
   ```
   u=User.find_by_username('<$USERNAME>');
   u.password='<$PASSWORD>'
   u.save
   exit
   ```

---
