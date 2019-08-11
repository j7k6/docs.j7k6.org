---
layout: post
title: "Send Mail with Netcat on VMware ESXi"
tags: [vmware,esxi,netcat,email]
---

## Firewall
Before sending mail, SMTP port 25 has to be opened in the ESXi firewall for outgoing connections.

1. Edit `/etc/vmware/firewall/smtp.xml`:
   ```
   <ConfigRoot>
     <service id='2525'>
       <id>SMTP_Out</id>
       <rule id='0000'>
         <direction>outbound</direction>
         <protocol>tcp</protocol>
         <porttype>dst</porttype>
         <port>25</port>
       </rule>
       <enabled>true</enabled>
       <required>false</required>
     </service>
   </ConfigRoot>
   ```
2. Reload firewall rules:
   ```bash
   esxcli network firewall refresh
   ```
3. Make firewall rules persistent:
   ```bash
   chmod +t /etc/vmware/firewall/smtp.xml
   /bin/auto-backup.sh
   ```

## Send Mail
> **Note**: The mail server needs to support unencrypted SMTP on port 25! Authentication is possible, but not necessary if you control both servers, just whitelist the ESXi's IP for sending unauthenticated mail.

```bash
echo -e "\
  EHLO localhost\n\
  MAIL FROM: <$SENDER_ADDRESS>\n\
  RCPT TO: <$RCPT_ADDRESS>\n\
  DATA\n\
  From: <$SENDER_ADDRESS>\n\
  Subject: <$SUBJECT>\n\
  <$MAIL_BODY>\n\n\
  .\n\
  quit\n" \
| nc <$MAIL_SERVER> 25
```

---
