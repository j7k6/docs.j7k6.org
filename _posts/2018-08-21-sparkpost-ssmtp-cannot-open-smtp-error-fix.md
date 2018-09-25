---
layout: post
title: "Fix sSMTP Error 'Cannot open smtp.sparkpostmail.com:587' When Using Sparkpost SMTP"
tags: [sparkpost,smtp,ssmtp,fix]
---

*Sparkpost* decided to [**deprecate *TLS v1.0* support**](https://www.sparkpost.com/blog/tls-v1-0-deprecation/) on their SMTP services in July 2018.
This change led to an unspecified error when trying to send mails with older Debian/Ubuntu versions of `ssmtp` (which appearantly doesn't support *TLS v1.1*):
> *ssmtp: Cannot open smtp.sparkpostmail.com:587*

The debug-log showed that the connection was closed after the `STARTTLS` command, just saying
> *220 2.0.0 continue*

I found out that only compiling `ssmtp` from source helped to make it work with *Sparkpost*'s new transport encryption policy:
```bash
curl -fsSL http://http.debian.net/debian/pool/main/s/ssmtp/ssmtp_2.64.orig.tar.bz2 | tar jxvf -
cd ssmtp-2.64
./configure --prefix=/
make && cp ./ssmtp /usr/sbin/
```

---
