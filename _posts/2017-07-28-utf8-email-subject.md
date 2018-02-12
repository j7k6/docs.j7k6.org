---
layout: post
title: "UTF-8 Encoded Email Subject"
tags: [email,utf-8,fix]
---

Email subjects are not UTF-8 encoded, even if the Content Type is set to `Content-Type: text/plain; charset='utf-8'`.
To make the subject UTF-8 encoded, set the subject header line to:

```
Subject: =?utf-8?B?<$BASE64_ENCODED_SUBJECT>?=
```

---
1. [https://ncona.com/2011/06/using-utf-8-characters-on-an-e-mail-subject/](https://ncona.com/2011/06/using-utf-8-characters-on-an-e-mail-subject/)
