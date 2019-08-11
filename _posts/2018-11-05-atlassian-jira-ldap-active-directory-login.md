---
layout: post
title: "Jira with Active Directory Login"
fav: 1
---

Navigate to **Jira Administration** (the gear icon) → **User Management** → **User Directories** → **Add Directory**:

## Server Settings
- Directory Type: `Microsoft Active Directory`
- Hostname: `<$DOMAIN_CONTROLLER>`
- Username: `<$UNPRIVILEGED_AD_ACCOUNT_USERNAME>`
- Password: `<$UNPRIVILEGED_AD_ACCOUNT_PASSWORD>`

## LDAP Schema
- Base DN: `dc=example,dc=com`

## LDAP Permissions
*Read Only, with Local Groups*

## User Schema Settings
- User Object Filter:
  ```
  (&(objectCategory=Person)(sAMAccountName=*)(memberOf:1.2.840.113556.1.4.1941:=CN=Jira,OU=Users,DC=example,DC=com))
  ```

... *Save and Test* with an existing Active Directory user login, which is a member of the AD group `Jira`. Then go back to the *User Directories* overview and *Synchronise* the new Active Directory connection.

After the initial sync all users from the Active Directory `Jira` security group show up in the Jira *Users* list.
Every user that needs to log in to Jira needs a license assigned to their account. This can be done by setting the *Application Access* option to at least one of the available applications (e.g. **Jira Software**).
The user is now able to login to Jira by using Active Directory credentials.

---
