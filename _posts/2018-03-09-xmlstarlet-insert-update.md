---
layout: post
title: "Replace or Insert Attribute to XML with xmlstarlet"
tags: [xml,xmlstarlet]
---

This command updates an attribute if it already exists and inserts a new attribute if it doesn't exist, so there will not be any duplicates:

```bash
xmlstarlet edit --inplace \
  --update "/<$ELEMENT_SELECTOR>/@<$ATTR_KEY>" --value "<$ATTR_VALUE>" \
  --insert "/<$ELEMENT_SELECTOR>/[not(@<$ATTR_KEY>)]" --type attr -n <$ATTR_KEY> --value "<$ATTR_VALUE>" \
  <$XML_FILE>
```

---
