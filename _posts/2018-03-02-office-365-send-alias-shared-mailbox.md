---
layout: post
title: "Send Mails from Alias Email Address with Office 365"
tags: [office-365]
---

The title is wrong, at least technically. It's not about sending mails from an alias, but rather from a shared mailbox.
If you want to send mails from another sender address then your primary mailbox address, it's possible to create a shared mailbox and allow yourself to send in its name.

To create a shared mailbox, login to the [*Exchange Admin Center* (**ECP**)](https://outlook.office.com/ecp/).
Navigate to `recipients` > `shared` and create a **new shared mailbox**:

- *Display name:* `whatever...`
- *Email address:* `<$SENDER_ADDRESS>`
- *Users:* add your mailbox to the list of authorized senders (**+**)

---
