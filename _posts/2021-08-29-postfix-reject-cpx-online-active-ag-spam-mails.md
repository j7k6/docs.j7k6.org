---
layout: post
title: "Postfix: Reject Spam Mails from cpx online active AG"
---

*cpx online active AG* is a notorious spamming company from Switzerland. The unsubscribe option they offer in their mails is a fraud, spam mails keep coming just from different senders.

But there is one thing they all have in common: the mail footer always contains the company's name.

To reject all mails containing the string `cpx online active AG`, the Postfix *body_checks* option can be used.

1. Install the Postfix PCRE module:
   ```bash
   apt install postfix-pcre
   ```
2. Add the *body_check* option to `/etc/postfix/main.cf`:
   ```
   body_checks = pcre:/etc/postfix/body_checks
   ```
3. Create `/etc/postfix/body_checks`:
   ```
   /cpx online active AG/  REJECT
   ```
4. Run `postmap /etc/postfix/body_checks`.
5. Restart the Postfix service:
   ```bash
   systemctl restart postfix
   ```

---
