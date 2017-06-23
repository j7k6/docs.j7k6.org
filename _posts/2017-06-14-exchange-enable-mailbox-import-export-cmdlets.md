---
layout: post
title: "Enable Mailbox Import/Export Cmdlets for Exchange"
tags: [fix, exchange, powershell]
---

```powershell
New-ManagementRoleAssignment -Name "Import Export PST" -SecurityGroup "Organization Management" -Role "Mailbox Import Export"
```

---
1. [https://dave.harris.uno/new-mailboximportrequest-is-not-recognized-as-the-name-of-a-cmdlet-in-exchange-2010-sp1/](https://dave.harris.uno/new-mailboximportrequest-is-not-recognized-as-the-name-of-a-cmdlet-in-exchange-2010-sp1/)
