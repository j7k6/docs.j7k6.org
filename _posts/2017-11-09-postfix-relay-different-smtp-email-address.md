---
layout: post
title: "Use different SMTP Server for specific Email Address in Postfix Relay"
tags: [smtp,exchange,postfix,office-365]
---

This is based on a `postfix` MX server, whose single purpose is to relay mails for an *Exchange* server. While migrating mailboxes to Office 365 in a hybri on-premise/cloud environment, mails for mailboxes which are already flagged as "Office 365", may have problems being delivered for several reasons. To get mails delivered to that mailboxes, they need to be redirected to the outlook.com MX servers by `postfix`. This can be done with `transport_maps`:

1. Edit `/etc/postfix/main.cf`:
   ```
   ...
   relay_domains = <DOMAIN>
   relay_transport = smtp:[<EXCHANGE>]:25
   transport_maps = hash:/etc/postfix/transport_maps
   ...
   ```
2. Edit `/etc/postfix/transport_maps`:
   ```
   <DOMAIN> smtp:[<EXCHANGE>]:25
   <USER>@<DOMAIN> smtp:<COMPANY>.mail.protection.outlook.com
   ```
3. Regenerate `transport_maps`:
   ```bash
   postmap /etc/postfix/transport_maps
   ```
4. `postfix reload`

---
