---
layout: post
title: "Fork mail() into Background (Async) in PHP"
tags: [php,async]
---

If sending an email with the native PHP `mail()` function shouldn't  block the rest of the script, it's possible to fork the process into background with a system shell execution:

```php
exec("php -r 'mail(\"".$to."\", \"".$subject."\", \"".$body."\", \"".$header."\");' > /dev/null  &");
```

---
