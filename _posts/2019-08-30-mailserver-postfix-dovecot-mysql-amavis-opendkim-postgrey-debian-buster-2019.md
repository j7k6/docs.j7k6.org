---
layout: post
title: "Secure Mailserver with Postfix, Dovecot & MySQL on Debian Buster"
fav: 1
---

## Prerequirements
### DNS
1. Set-up required *DNS* records:
   ```
   <$DOMAIN>          IN  MX   0  <$FQDN>
   <$FQDN>            IN  A       <$IP>
   <$DOMAIN>          IN  TXT     v=spf1 mx ~all
   _dmarc.<$DOMAIN>.  IN  TXT     v=DMARC1; p=none
   ```
2. Set-up a *Reverse-DNS* record for the Server.

### Basic System Setup
1. Set *mailname* (FQDN) in `/etc/mailname`:
   ```
   <$FQDN>
   ```
2. Install required packages:
   ```bash
   export DEBIAN_FRONTEND=noninteractive

   apt update
   apt install -y 
     amavisd-new \
     certbot \
     dovecot-core \
     dovecot-imapd \
     dovecot-lmtpd \
     dovecot-mysql \
     dovecot-sieve \
     haveged \
     mailutils \
     mariadb-server \
     opendkim \
     opendkim-tools \
     p7zip \
     postfix \
     postfix-mysql \
     postgrey \
     spamassassin
   ```
3. Generate `dhparam` file:
   ```bash
   openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
   ```
4. Create required `vmail` user and group:
   ```bash
   groupadd -g 5000 vmail
   useradd -g vmail -u 5000 vmail -d /var/vmail
   ```
5. Create mailbox directory:
   ```bash
   mkdir -p /var/vmail
   chown -R vmail:vmail /var/vmail
   ```

## MySQL
1. Configure *MariaDB* (MySQL):
   ```bash
   mysql_secure_installation
   ```
2. Run `mysql -uroot -p`
3. Create *postfix* database & user:
   ```mysql
CREATE DATABASE `postfix`;
GRANT SELECT ON `postfix`.* TO `postfix`@`127.0.0.1` IDENTIFIED BY 'postfix';
FLUSH PRIVILEGES;
USE postfix;
   ```
4. Create *domains* table:
   ```mysql
CREATE TABLE `domains` (
  `id` int(11) NOT NULL auto_increment,
  `domain` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
   ```
5. Create *users* table:
   ```mysql
CREATE TABLE `users` (
  `id` int(11) NOT NULL auto_increment,
  `domain` int(11) NOT NULL,
  `password` varchar(106) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  FOREIGN KEY (domain) REFERENCES domains(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
   ```
6. Create *aliases* table:
   ```mysql
CREATE TABLE `aliases` (
  `id` int(11) NOT NULL auto_increment,
  `domain` int(11) NOT NULL,
  `source` varchar(100) NOT NULL,
  `destination` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (domain) REFERENCES domains(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
   ```

## Let's Encrypt
### Nginx Base Setup
1. Install *Nginx*, see [here](/nginx-debian-install/).
2. Configure *Nginx*, see [here](https://github.com/j7k6/nginx-config)

### Certbot
1. Edit `/etc/letsencrypt/cli.ini`:
   ```
   renew-hook = systemctl restart nginx postfix dovecot
   ```
2. Create *webroot* directory:
   ```bash
   mkdir -p /var/www/letsencrypt
   ```
2. Fetch SSL certificate:
   ```bash
   certbot certonly --agree-tos -m postmaster@<$DOMAIN> --no-eff-email --rsa-key-size 4096 --webroot -w /var/www/letsencrypt -d <$FQDN>
   ```

### Nginx SSL Site Setup
3. Create `/etc/nginx/sites-available/<$FQDN>.conf`:
   ```
   server {
     server_name <$FQDN>;

     include conf.d/common.conf;
     include conf.d/ssl.conf;
     include conf.d/sslmodern.conf;

     ssl_certificate /etc/letsencrypt/live/<$FQDN>/fullchain.pem;
     ssl_certificate_key /etc/letsencrypt/live/<$FQDN>/privkey.pem;
     ssl_trusted_certificate /etc/letsencrypt/live/<$FQDN>/chain.pem;

     location / {
       include conf.d/proxy.conf;
       proxy_pass http://127.0.0.1:8080;
     }
   }
   ```
4. Symlink site config:
   ```bash
   ln -s /etc/nginx/sites-available/<$FQDN>.conf /etc/nginx/sites-enabled/
   ```
5. Restart *Nginx* service:
   ```bash
   systemctl restart nginx
   ```

## Postfix
### Basic Configuration
1. Add to `/etc/postfix/master.cf`:
   ```
submission inet n       -       y      -       -       smtpd
  -o smtpd_tls_security_level=encrypt
  -o header_checks=regexp:/etc/postfix/header_checks
amavis           unix    -       -       n       -       2       smtp
  -o smtp_send_xforward_command=yes
  -o smtp_tls_security_level=none
127.0.0.1:10025  inet    n       -       n       -       -       smtpd
  -o content_filter=
   ```
2. Edit `/etc/postfix/main.cf`:
   ```
   alias_maps = hash:/etc/aliases
   compatibility_level = 2
   content_filter = amavis:[127.0.0.1]:10024
   inet_protocols = ipv4
   mailbox_size_limit = 0
   message_size_limit = 20480000
   mydestination = localhost, localhost.localdomain
   myhostname = <$FQDN>
   mynetworks = 127.0.0.0/8
   myorigin = /etc/mailname
   non_smtpd_milters = inet:[127.0.0.1]:12301
   recipient_delimiter = +
   smtpd_banner = $myhostname ESMTP
   smtpd_milters = inet:[127.0.0.1]:12301
   smtpd_recipient_restrictions = permit_mynetworks, permit_sasl_authenticated, reject_invalid_hostname, reject_non_fqdn_hostname, reject_non_fqdn_sender, reject_non_fqdn_recipient, reject_unknown_sender_domain, reject_unknown_recipient_domain, reject_unauth_destination, check_policy_service inet:[127.0.0.1]:10023
   smtpd_sasl_auth_enable = yes
   smtpd_sasl_path = private/auth
   smtpd_sasl_type = dovecot
   smtpd_tls_CApath = /etc/ssl/certs
   smtpd_tls_cert_file = /etc/letsencrypt/live/<$FQDN>/fullchain.pem
   smtpd_tls_eecdh_grade = strong
   smtpd_tls_key_file = /etc/letsencrypt/live/<$FQDN>/privkey.pem
   smtpd_tls_security_level = may
   smtp_tls_CApath = /etc/ssl/certs
   smtp_tls_cert_file = $smtpd_tls_cert_file
   smtp_tls_key_file = $smtpd_tls_key_file
   smtp_tls_security_level = may
   smtp_use_tls = yes
   tls_preempt_cipherlist = yes
   virtual_alias_maps = mysql:/etc/postfix/mysql_virtual_alias_maps.cf
   virtual_gid_maps = static:5000
   virtual_mailbox_base = /var/vmail
   virtual_mailbox_domains = mysql:/etc/postfix/mysql_virtual_mailbox_domains.cf
   virtual_mailbox_maps = mysql:/etc/postfix/mysql_virtual_mailbox_maps.cf
   virtual_transport = lmtp:unix:private/dovecot-lmtp
   virtual_uid_maps = static:5000
   ```
### MySQL Configuration
1. Edit `/etc/postfix/mysql_virtual_mailbox_domains.cf`:
   ```
   user = postfix
   password = postfix
   hosts = 127.0.0.1
   dbname = postfix
   query = SELECT 1 FROM domains WHERE domain='%s'
   ```
2. Edit: `/etc/postfix/mysql_virtual_mailbox_maps.cf`:
   ```
   user = postfix
   password = postfix
   hosts = 127.0.0.1
   dbname = postfix
   query = SELECT 1 FROM users WHERE email='%s'
   ```
3. Edit `/etc/postfix/mysql_virtual_alias_maps.cf`:
   ```
   user = postfix
   password = postfix
   hosts = 127.0.0.1
   dbname = postfix
   query = SELECT destination FROM aliases WHERE source='%s'
   ```

### Header Checks
> **Note**: Header checks prevent outgoing mails from leaking privacy related information like internal IP addresses or the mail client's name.

1. Edit `/etc/postfix/header_checks`:
   ```
   /^Received:.*with ESMTP/        IGNORE
   /^X-Mailer:/                    IGNORE
   /^User-Agent:/                  IGNORE
   /^Mime-Version:/                IGNORE
   ```
2. Generate Postfix map:
   ```
   postmap /etc/postfix/header_checks
   ```

### Finalize Postfix Setup
1. Generate *alias* map:
   ```bash
   newaliases
   ```
2. Restart *Postfix* service:
   ```bash
   systemctl restart postfix
   ```

## Dovecot
1. Edit `/etc/dovecot/dovecot.conf`:
   ```
   listen = *
   mail_location = maildir:/var/vmail/%d/%n/
   protocols = imap lmtp
   ssl = required
   ssl_cert = `<`/etc/letsencrypt/live/<$FQDN>/fullchain.pem
   ssl_key = `<`/etc/letsencrypt/live/<$FQDN>/privkey.pem
   ssl_prefer_server_ciphers = yes

   namespace inbox {
     inbox = yes
     location =
     separator = /

     mailbox Drafts {
       auto = subscribe
       special_use = \Drafts
     }

     mailbox "Sent Messages" {
       auto = subscribe
       special_use = \Sent
     }

     mailbox Junk {
       auto = subscribe
       special_use = \Junk
     }

     mailbox "Deleted Messages" {
       auto = subscribe
       special_use = \Trash
     }

     mailbox Archive {
       auto = subscribe
       special_use = \Archive
     }

     mailbox Notes {
       auto = subscribe
     }
   }

   passdb {
     driver = sql
     args = /etc/dovecot/dovecot-sql.conf.ext
   }

   userdb {
     driver = static
     args = uid=vmail gid=vmail home=/var/vmail/%d/%n
   }

   service auth {
     unix_listener /var/spool/postfix/private/auth {
       group = postfix
       mode = 0660
       user = postfix
     }

     unix_listener auth-userdb {
       mode = 0600
       user = vmail
     }

     user = dovecot
   }

   service auth-worker {
     user = vmail
   }

   service imap-login {
     inet_listener imap {
       port = 0
     }
     inet_listener imaps {
       port = 993
     }
   }

   service lmtp {
     unix_listener /var/spool/postfix/private/dovecot-lmtp {
       group = postfix
       mode = 0600
       user = postfix
     }
   }

   protocol lmtp {
     postmaster_address = postmaster@<$FQDN>
     hostname = <$FQDN>
     mail_plugins = sieve
   }

   plugin {
     sieve_before = /etc/dovecot/spam.sieve
   }
   ```
2. Edit `/etc/dovecot/dovecot-sql.conf.ext`:
   ```
   driver = mysql
   connect = host=127.0.0.1 dbname=postfix user=postfix password=postfix
   default_pass_scheme = SHA512-CRYPT
   password_query = SELECT email as user, password FROM users WHERE email='%u';
   ```
3. Edit `/etc/dovecot/spam.sieve`:
   ```
   require ["fileinto", "imap4flags"];

   if header :contains "X-Spam-Flag" "YES" {
     setflag "\\Seen";
     fileinto "Spam";
     stop;
   }
   ```
4. Compile *Sieve* spam rules:
   ```bash
   sievec /etc/dovecot/spam.sieve
   ```
5. Restart *Dovecot* service:
   ```bash
   systemctl restart dovecot
   ```

## Anti-Spam Measures
### Postgrey
1. Update *Greylisting* whitelist:
   ```
   wget -O /etc/postgrey/whitelist_clients https://raw.githubusercontent.com/schweikert/postgrey/master/postgrey_whitelist_clients
   ```
2. Restart *Postgrey* service:
   ```bash
   systemctl restart postgrey
   ```

### OpenDKIM
1. Edit `/etc/opendkim.conf`
   ```
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
   ```
2. Create config directory:
   ```bash
   mkdir -p /etc/opendkim
   ```
3. Edit `/etc/opendkim/TrustedHosts`:
   ```
   127.0.0.1
   localhost
   ```
4. Edit `/etc/opendkim/KeyTable`:
   ```
   mail2019._domainkey.<$DOMAIN> <$DOMAIN>:mail2019:/etc/opendkim/keys/<$DOMAIN>/mail2019.private
   ```
5. Edit `/etc/opendkim/SigningTable`:
   ```
   *@<$DOMAIN> mail2019._domainkey.<$DOMAIN>
   ```
6. Create *Domain Key* directory:
   ```
   mkdir -p /etc/opendkim/keys/<$DOMAIN>
   ```
7. Generate *Domain Key*:
   ```bash
   opendkim-genkey -s mail2019 -d <$DOMAIN> -D /etc/opendkim/keys/<$DOMAIN>
   ```
8. Set permissions on *Domain Key*
   ```bash
   chown opendkim:opendkim /etc/opendkim/keys/<$DOMAIN>/mail2019.private
   chmod 0400 /etc/opendkim/keys/<$DOMAIN>/mail2019.private
   ```
9. Restart *OpenDKIM* service:
   ```bash
   systemctl restart opendkim
   ```
10. Get DKIM record from `/etc/opendkim/keys/<$DOMAIN>/mail2019.txt` and create a new DNS record from it.

### Amavis
1. Add `amavis` user to `vmail` group:
   ```bash
   usermod -aG vmail amavis
   ```
2. Edit `/etc/amavis/conf.d/50-user`:
   ```
   use strict;

   $smtp_connection_cache_on_demand = 0;
   $smtp_connection_cache_enable = 0;

   @bypass_spam_checks_maps = (
      \%bypass_spam_checks, \@bypass_spam_checks_acl, \$bypass_spam_checks_re);

   $sa_tag_level_deflt  = -999;
   $sa_tag2_level_deflt = 2.0;
   $sa_kill_level_deflt = 2.0;
   $sa_dsn_cutoff_level = 5.0;

   $final_spam_destiny       = D_PASS;

   $undecipherable_subject_tag=undef;

   @lookup_sql_dsn = (
     ['DBI:mysql:database=postfix;host=127.0.0.1;port=3306',
      'postfix',
      'postfix']);

   $sql_select_policy = 'SELECT domain FROM domains WHERE CONCAT("@",domain) IN (%k)';

   1;
   ```
3. Restart *Amavis* service:
   ```bash
   systemctl restart amavis
   ```

### Spamassassin
1. Download and extract spam samples:
   ```bash
   cd /tmp
   wget http://untroubled.org/spam/2019-08.7z
   p7zip -d 2019-08.7z
   chown -R amavis:amavis 2019/
   cd -
   ```
2. Make *Spamassassin* learn from spam samples to populate the local *ham/spam*  database:
   ```bash
   su amavis -c 'sa-learn --progress --spam /tmp/2019/'
   ```
3. Add cronjobs for *Spamassassin* (run `crontab -e`):
   ```
   @hourly su amavis -c 'sa-learn --ham /var/vmail/*/*/cur/'
   @hourly su amavis -c 'sa-learn --spam /var/vmail/*/*/.Junk/cur/'
   ```

### Razor (& Pyzor)
1. Initialize *Razor*:
   ```bash
   su amavis -c 'razor-admin -create'
   su amavis -c 'razor-admin -register'
   su amavis -c 'razor-admin -discover'
   ```
2. *Pyzor* doesn't need any configuration.

## Domains, Mailboxes & Aliases
### Domains
1. Create domain mailbox directory:
   ```bash
   su vmail -c 'mkdir -p -m 0770 /var/vmail/<$DOMAIN>'
   ```
2. Add domain entry to *MySQL* database:
   ```mysql
   INSERT INTO `postfix`.`domains` (`id` ,`domain`) VALUES ('1', '<$DOMAIN>');
   ```

### Mailboxes
1. Add mailbox entry to *MySQL* database:
   ```mysql
   INSERT INTO `postfix`.`users` (`id`, `domain`, `password` , `email`) VALUES ('1', '1', ENCRYPT('<$PASSWORD>', CONCAT('$6$', SUBSTRING(SHA(RAND()), -16))), 'admin@<$DOMAIN>');
      ```
2. Initialize mailbox directory (optional):
   ```
   doveadm mailbox create -u admin@<$DOMAIN> INBOX
   ```

### Aliases
To create a *Catch-All* alias, add this alias entry to the *MySQL* database:

```
INSERT INTO `postfix`.`aliases` (`id`, `domain`, `source`, `destination`) VALUES ('1', '1', '@<$DOMAIN>', 'admin@<$DOMAIN>');
```


## TODO
- Spam Tests
- Roundcubemail
- Postfixadmin

---
1. <https://www.linode.com/docs/email/postfix/email-with-postfix-dovecot-and-mysql/>
2. <https://blogging.dragon.org.uk/mail-server-on-ubuntu-18-04-part-3/>
3. <https://www.syn-flut.de/spamassassin-erkennungsrate-deutlich-verbessern>
4. <https://www.df.eu/de/support/df-faq/cloudserver/anleitungen/spam-und-virenschutz-mit-postfix-debian/>





