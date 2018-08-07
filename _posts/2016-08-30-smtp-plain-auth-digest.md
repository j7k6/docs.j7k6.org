---
layout: post
title: "Generate SMTP PLAIN AUTH Digest"
tags: [smtp, perl]
---

```bash
perl -e 'use MIME::Base64; print encode_base64(join "\0", qw"<$USERNAME> <$USERNAME> <$PASSWORD>");'
```

---
