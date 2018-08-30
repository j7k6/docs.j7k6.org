---
layout: post
title: "Send Mails via SparkPost API with Python"
tags: [python,sparkpost,email]
---

1. Generate [SparkPost](https://app.sparkpost.com/account/api-keys) API key.
2. Install `sparkpost` Python package:
   ```bash
   pip install sparkpost
   ```
3. Python script:
   ```python
   from sparkpost import SparkPost

   sp = SparkPost(<$SPARKPOST_API_KEY>)

   response = sp.transmissions.send(
     recipients=[<$RECIPIENTS_LIST>],
     text=<$MESSAGE>,
     from_email=<$SENDER_ADDRESS>,
     subject=<$SUBJECT>,
     attachments=[
       {
         "name": "<$FILE_NAME>",
         "type": "<$MIME_TYPE>",
         "filename": "<$FILE_LOCATION>"
       }
     ]
   )
   print(response)
   ```

---
1. <https://python-sparkpost.readthedocs.io/en/latest/resources/transmissions.html>
