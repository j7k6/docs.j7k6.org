---
layout: post
title: "Send Mail over SMTP with Python"
tags: [python, smtp]
---

```python
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from email.mime.text import MIMEText

msg = MIMEMultipart()
msg['Subject'] = <$MAIL_SUBJECT>
msg['From'] = <$SENDER_ADDRESS>
msg['To'] = ', '.join(<$RECIPIENT_LIST>)
msg.attach(MIMEText(<$MAIL_BODY>, 'plain'))
msg.attach(MIMEImage(open(<$ATTACHMENT_FILE>, 'rb').read()))

smtp = smtplib.SMTP(<$SMTP_SERVER>, <$SMTP_PORT>)
smtp.starttls()
smtp.login(<$SMTP_USERNAME>, <$SMTP_PASSWORD>)
smtp.sendmail(<$SENDER_ADDRESS>, <$RECIPIENT_LIST> , msg.as_string())
smtp.quit()
```

---
