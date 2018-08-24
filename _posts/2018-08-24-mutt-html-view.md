---
layout: post
title: "View HTML Emails in Mutt"
tags: [mutt,email]
---

1. Edit *~/.muttrc*:
   ```
   auto_view text/html
   alternative_order text/plain text/enriched text/html
   ```
2. Edit *~/.mutt/mailcap*:
   ```
   text/html; w3m -I %{charset} -T text/html; copiousoutput;
   ```

---
1. <http://jasonwryan.com/blog/2012/05/12/mutt/>
