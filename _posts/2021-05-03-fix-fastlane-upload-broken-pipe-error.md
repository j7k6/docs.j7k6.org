---
layout: post
title: "Fix Fastlane Pilot Upload Broken Pipe Error"
---

> An error occurred while uploading the file f6952d6eef555ddd87aca66e56b91530222d6e318414816f3ba7cf5bf694bf0f.ipa.
> An exception has occurred: Broken pipe

If this error occures when running `fastlane pilot upload`, set the following environment variables to fix it:

- `DELIVER_ITMSTRANSPORTER_ADDITIONAL_UPLOAD_PARAMETERS=-t DAV`
- `FASTLANE_ITUNES_TRANSPORTER_USE_SHELL_SCRIPT=1`

---
