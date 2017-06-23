---
layout: post
title: "Secure Mailserver with Postfix, Dovecot and Let's Encrypt on Debian Jessie"
tags: [mail, server, postfix, dovecot, letsencrypt, debian, linux]
---

## Prerequirements

### Config Options

```bash
export FQDN="mail.example.org"
export DOMAIN="example.org"
export MAILBOX="user"
export DEBIAN_FRONTEND="noninteractive"
export A_RECORD=$(curl -sSL https://icanhazip.com)
```

### DNS

With *Digital Ocean* API:

```bash
export DO_API_KEY="abc1234567890..."

# A record
curl -X POST -H "Content-Type: application/json" -d "{\"type\":\"A\",\"name\":\"mail\",\"data\":\"${A_RECORD}\",\"priority\":null,\"port\":null,\"weight\":null}" -H "Authorization: Bearer ${DO_API_KEY}" "https://api.digitalocean.com/v2/domains/${DOMAIN}/records"

# MX record
curl -X POST -H "Content-Type: application/json" -d "{\"type\":\"MX\",\"name\":\"mail\",\"data\":\"${FQDN}.\",\"priority\":10,\"port\":null,\"weight\":null}" -H "Authorization: Bearer ${DO_API_KEY}" "https://api.digitalocean.com/v2/domains/${DOMAIN}/records"

# SPF record
curl -X POST -H "Content-Type: application/json" -d "{\"type\":\"TXT\",\"name\":\"@\",\"data\":\"v=spf1 mx ~all\",\"priority\":null,\"port\":null,\"weight\":null}" -H "Authorization: Bearer ${DO_API_KEY}" "https://api.digitalocean.com/v2/domains/${DOMAIN}/records"

# DMARC record
curl -X POST -H "Content-Type: application/json" -d "{\"type\":\"TXT\",\"name\":\"_dmarc\",\"data\":\"v=DMARC1; p=none\",\"priority\":null,\"port\":null,\"weight\":null}" -H "Authorization: Bearer ${DO_API_KEY}" "https://api.digitalocean.com/v2/domains/${DOMAIN}/records"
```

Without *DO* API:
```
$FQDN. 1800 IN A $A_RECORD
$DOMAIN. 1800 IN MX 10 $FQDN
$DOMAIN. 1800 IN TXT v=spf1 mx ~all
_dmarc.$DOMAIN. 1800 IN TXT v=DMARC1; p=none
```

### Misc

```bash
cat > /etc/mailname << EOF
${FQDN}
EOF
```

### Install packages

```bash
echo "deb http://ftp.debian.org/debian jessie-backports main" >> /etc/apt/sources.list
apt-get update
apt-get install -y postfix dovecot-core dovecot-imapd amavisd-new postgrey opendkim opendkim-tools
apt-get install -y certbot -t jessie-backports
```

### SSL / Let's Encrypt

Generate SSL certificate with the *Let's Encrypt* client:
```bash
certbot certonly --register-unsafely-without-email --agree-tos --standalone -d "${FQDN}"
```

Generate *Diffie Hellman* Keys:
```bash
openssl gendh -out /etc/postfix/dh_512.pem -2 512
openssl gendh -out /etc/postfix/dh_2048.pem -2 2048
```

## Postfix

```bash
cat > /etc/postfix/main.cf << EOF
alias_maps = hash:/etc/aliases
config_directory = /etc/postfix
content_filter = amavis:[127.0.0.1]:10024
home_mailbox = Maildir/
inet_interfaces = all
inet_protocols = ipv4
mailbox_size_limit = 0
milter_default_action = accept
milter_protocol = 2
mydestination = ${FQDN}, ${FQDN}, localhost, localhost.localdomain
myhostname = ${FQDN}
mynetworks = 127.0.0.0/8
myorigin = /etc/mailname
non_smtpd_milters = inet:localhost:12301
recipient_delimiter = +
smtp_tls_CApath = /etc/ssl/certs
smtp_tls_cert_file = /etc/letsencrypt/live/${FQDN}/fullchain.pem
smtp_tls_key_file = /etc/letsencrypt/live/${FQDN}/privkey.pem
smtp_tls_security_level = may
smtp_use_tls = yes
smtpd_banner = $myhostname ESMTP
smtpd_milters = inet:localhost:12301
smtpd_recipient_restrictions = permit_mynetworks, reject_invalid_hostname, reject_non_fqdn_hostname, reject_non_fqdn_sender, reject_non_fqdn_recipient, reject_unknown_sender_domain, reject_unknown_recipient_domain, permit_sasl_authenticated, reject_unauth_destination, check_policy_service inet:[127.0.0.1]:10023
smtpd_sasl_auth_enable = yes
smtpd_sasl_path = private/auth
smtpd_sasl_security_options = noanonymous
smtpd_sasl_type = dovecot
smtpd_tls_CApath = /etc/ssl/certs
smtpd_tls_cert_file = /etc/letsencrypt/live/${FQDN}/fullchain.pem
smtpd_tls_dh1024_param_file = /etc/postfix/dh_2048.pem
smtpd_tls_dh512_param_file = /etc/postfix/dh_512.pem
smtpd_tls_eecdh_grade = strong
smtpd_tls_key_file = /etc/letsencrypt/live/${FQDN}/privkey.pem
smtpd_tls_mandatory_ciphers = medium
smtpd_tls_mandatory_protocols = !SSLv2,!SSLv3,!TLSv1,!TLSv1.1
smtpd_tls_protocols = !SSLv2,!SSLv3,!TLSv1,!TLSv1.1
smtpd_tls_security_level = may
tls_medium_cipherlist = AES128+EECDH:AES128+EDH
tls_preempt_cipherlist = yes
EOF
```

```bash
cat >> /etc/postfix/master.cf << EOF
submission       inet    n       -       n       -       -       smtpd
  -o smtpd_tls_security_level=encrypt
amavis           unix    -       -       -       -       2       smtp
  -o smtp_send_xforward_command=yes
  -o smtp_tls_security_level=none
127.0.0.1:10025  inet    n       -       -       -       -       smtpd
  -o content_filter=
EOF
```

## Dovecot

```bash
cat > /etc/dovecot/dovecot.conf << EOF
listen = *
mail_location = maildir:~/Maildir
namespace inbox {
  inbox = yes
  location =
  mailbox Drafts {
    auto = no
    special_use = \Drafts
  }
  mailbox Sent {
    auto = subscribe
    special_use = \Sent
  }
  mailbox Spam {
    auto = create
    special_use = \Junk
  }
  mailbox Trash {
    auto = no
    special_use = \Trash
  }
  prefix =
}
passdb {
  args = %s
  driver = pam
}
protocols = imap
service auth {
  unix_listener /var/spool/postfix/private/auth {
    group = postfix
    mode = 0660
    user = postfix
  }
}
service imap-login {
  inet_listener imap {
    port = 0
  }
  inet_listener imaps {
    port = 993
  }
}
ssl = required
ssl_cert = </etc/letsencrypt/live/${FQDN}/fullchain.pem
ssl_cipher_list = AES128+EECDH:AES128+EDH
ssl_dh_parameters_length = 4096
ssl_key = </etc/letsencrypt/live/${FQDN}/privkey.pem
ssl_prefer_server_ciphers = yes
ssl_protocols = !SSLv2 !SSLv3
userdb {
  driver = passwd
}
EOF
```

## Anti-Spam Measures

### Amavis

```bash
cat >> /etc/amavis/conf.d/20-debian_defaults << EOF
\$inet_socket_bind = '127.0.0.1';
EOF
```

### Postgrey

```bash
sed -i 's/inet=10023/inet=10023 --delay=30/' /etc/default/postgrey
```

### OpenDKIM

```bash
cat >> /etc/opendkim.conf << EOF
AutoRestart             Yes
AutoRestartRate         10/1h
UMask                   002
Syslog                  yes
SyslogSuccess           Yes
LogWhy                  Yes

Canonicalization        relaxed/simple

ExternalIgnoreList      refile:/etc/opendkim/TrustedHosts
InternalHosts           refile:/etc/opendkim/TrustedHosts
KeyTable                refile:/etc/opendkim/KeyTable
SigningTable            refile:/etc/opendkim/SigningTable

Mode                    sv
PidFile                 /var/run/opendkim/opendkim.pid
SignatureAlgorithm      rsa-sha256

UserID                  opendkim:opendkim

Socket                  inet:12301@localhost
EOF
```

```bash
(mkdir -p /etc/opendkim/keys/${DOMAIN} && cd /etc/opendkim/keys/${DOMAIN} && opendkim-genkey -s mail -d ${DOMAIN} && chown opendkim:opendkim /etc/opendkim/keys/${DOMAIN}/mail.private )
```

```bash
cat > /etc/opendkim/TrustedHosts << EOF
127.0.0.1
localhost
EOF
```

```bash
cat > /etc/opendkim/KeyTable << EOF
mail._domainkey.${DOMAIN} ${DOMAIN}:mail:/etc/opendkim/keys/${DOMAIN}/mail.private
EOF
```

```bash
cat > /etc/opendkim/SigningTable << EOF
*@${DOMAIN} mail._domainkey.${DOMAIN}
EOF
```

### DNS Records

With *Digital Ocean* API:
```bash
export DKIM_RECORD=$(cat /etc/opendkim/keys/${DOMAIN}/mail.txt | awk -F'"' '{print $2}' | tr -d '\n')

# DKIM records
curl -X POST -H "Content-Type: application/json" -d "{\"type\":\"TXT\",\"name\":\"mail._domainkey\",\"data\":\"${DKIM_RECORD}\",\"priority\":null,\"port\":null,\"weight\":null}" -H "Authorization: Bearer ${DO_API_KEY}" "https://api.digitalocean.com/v2/domains/${DOMAIN}/records"
```

Without *DO* API:
```bash
cat /etc/opendkim/keys/${DOMAIN}/mail.txt
```

## Mailbox Configs

### New User

```bash
adduser --disabled-password --gecos "" ${MAILBOX}
passwd ${MAILBOX}
```

### New Alias

```bash
cat >> /etc/aliases << EOF
root: ${MAILBOX}
EOF

newaliases
```

### Reboot

---
1. [https://thomas-leister.de/postfix-amavis-spamfilter-spamassassin-sieve/](https://thomas-leister.de/postfix-amavis-spamfilter-spamassassin-sieve/)
2. [https://arnowelzel.de/wp/greylisting-zur-spamvermeidung](https://arnowelzel.de/wp/greylisting-zur-spamvermeidung)
3. [https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-dkim-with-postfix-on-debian-wheezy](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-dkim-with-postfix-on-debian-wheezy)
4. [https://www.heinlein-support.de/blog/security/perfect-forward-secrecy-pfs-fur-postfix-und-dovecot/](https://www.heinlein-support.de/blog/security/perfect-forward-secrecy-pfs-fur-postfix-und-dovecot/)
5. [https://www.digitalocean.com/community/tutorials/how-to-set-up-a-postfix-e-mail-server-with-dovecot](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-postfix-e-mail-server-with-dovecot)
6. [https://blog.stefan-oltmann.de/postfix-und-dovecot-unter-debian/](https://blog.stefan-oltmann.de/postfix-und-dovecot-unter-debian/)
7. [http://www.cyberciti.biz/faq/postfix-mail-for-domaincom-loops-back-to-myself-error-and-solution/](http://www.cyberciti.biz/faq/postfix-mail-for-domaincom-loops-back-to-myself-error-and-solution/)
