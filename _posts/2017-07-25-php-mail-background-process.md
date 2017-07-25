---
layout: post
title: "Fork mail() to Background (Async) in PHP"
tags: [php,async]
---

```php
exec("php -r 'mail(\"".$to."\", \"".$subject."\", \"".body."\", \"".body."\");' > /dev/null  &");
```

---
