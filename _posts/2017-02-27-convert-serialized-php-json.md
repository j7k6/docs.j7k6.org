---
layout: post
title: "Convert Serialized PHP to JSON"
tags: [php, json]
---

```bash
cat $SERIALIZED_PHP_FILE | php -r 'echo json_encode(unserialize(file_get_contents("php://stdin")));'
```

---
