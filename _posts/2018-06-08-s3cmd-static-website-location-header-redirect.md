---
layout: post
title: "Add Redirect Location Header to File on Amazon S3 Static Website with s3cmd"
tags: [amazon,aws,s3,s3cmd]
---

```bash
s3cmd --access_key="<$AWS_ACCESS_KEY_ID>" --secret_key="<$AWS_SECRET_ACCESS_KEY>" modify --add-header "x-amz-website-redirect-location:/<$REDIRECT_LOCATION>/" s3://<$AWS_S3_BUCKET>/<$OBJECT>
```

---
