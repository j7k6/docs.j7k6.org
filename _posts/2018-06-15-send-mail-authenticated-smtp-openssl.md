---
layout: post
title: "Send Mail over Authenticated SMTP with STARTTLS via OpenSSL"
tags: [email,smtp,starttls,openssl,shell]
---

1. Generate *Base64* digests of username and password:
   ```bash
   perl -MMIME::Base64 -e 'print encode_base64("<$USERNAME>")'
   perl -MMIME::Base64 -e 'print encode_base64("<$PASSWORD>")'
   ```
2. Connect to mail server:
   ```bash
   openssl s_client -starttls smtp -crlf -quiet -connect <$MAIL_SERVER>:587
   ```
   > **Note**: Mind the **-quiet** option! Without it, openssl will renegotiate the SSL connection when the capital **R** (as in "**R**CPT TO") is pressed, instead of sending the "R" character to the server. [[Source](http://tumbleweed.org.za/2007/07/17/sclients-r-feature)] 
3. Send SMTP commands to server:
   ```
   EHLO localhost
   AUTH LOGIN
   <$USERNAME_BASE64>
   <$PASSWORD_BASE64>
   MAIL FROM: <$SENDER_ADDRESS>
   RCPT TO: <$RCPT_ADDRESS>
   DATA
   Subject: <$MAIL_SUBJECT>
   From: <$SENDER_ADDRESS>

   <$MAIL_BODY>
   
   .
   QUIT
   ```

---
