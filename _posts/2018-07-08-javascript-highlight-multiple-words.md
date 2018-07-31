---
layout: post
title: "Javascript: Highlight Multiple Words"
tags: [javascript,code-snippets]
---

This snippet is useful for highlighting multiple keywords in search results:
```javascript
var searchResult = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
var searchQuery = "ipsum sadipscing"

var highlightText = searchResult.replace((new RegExp(searchQuery.split(/\s/).join('|'), 'gi')), match => `<strong>${match}</strong>`);
```

Result:
> Lorem **ipsum** dolor sit amet, consetetur **sadipscing** elitr

---
1. <https://stackoverflow.com/a/48950887/8434893>
