---
layout: post
title: "PHP Mail with sSMTP"
tags: [php,mail,smtp,ssmtp]
---

### PHP
Add this line to `php.ini`:
```
sendmail_path = "/usr/sbin/ssmtp -t"
```

### SSMTP
1. Edit `/etc/ssmt/ssmtp.conf`:
   ```
   root=<$SENDER_ADDRESS>
   RewriteDomain=<$SENDER_DOMAIN>
   mailhub=<$SMTP_SERVER>:587
   AuthUser=<$SMTP_USER>
   AuthPass=<$SMTP_PASSWORD>
   FromLineOverride=Yes
   UseTLS=Yes
   UseSTARTTLS=Yes
   ```
2. Edit `config/ssmtp/revaliases`:
   ```
   root:<$SENDER_ADDRESS>:<$SMTP_SERVER>:587
   ```

---
