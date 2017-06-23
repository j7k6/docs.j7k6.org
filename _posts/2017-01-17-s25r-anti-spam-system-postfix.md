---
layout: post
title: "S25R Anti-Spam-System in Postfix"
tags: [postfix, spam]
---

```bash
postconf -e "smtpd_client_restrictions = check_client_access regexp:/etc/postfix/client_restrictions"

cat > /etc/postfix/client_restrictions << EOF
/^(dhcp|dialup|ppp|adsl|pool)[^.]*[0-9]/  550 S25R6 check
EOF

postfix reload
```

---
1. [https://calomel.org/postfix.html](https://calomel.org/postfix.html)
2. [http://www.gabacho-net.jp/en/anti-spam/anti-spam-system.html](http://www.gabacho-net.jp/en/anti-spam/anti-spam-system.html)
