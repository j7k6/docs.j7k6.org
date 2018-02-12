---
layout: post
title: "Access AngularJS $scope in Chrome Console"
tags: [angularjs, chrome]
---

```javascript
var scope = angular.element($('[ng-controller=<$CTRLNAME>]')).scope();
```

---
1. [http://stackoverflow.com/a/24043433](http://stackoverflow.com/a/24043433)
