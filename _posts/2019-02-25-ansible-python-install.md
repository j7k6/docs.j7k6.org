---
layout: post
title: "Install Python on Ansible Host Before Running Tasks"
---

```
- hosts: all
  become: True
  gather_facts: False
  pre_tasks:
  - raw: "test -e /usr/bin/python || (apt-get update && apt-get install -y python-minimal)"
  - setup:

  tasks:
	...
```

---
1. <https://gist.github.com/gwillem/4ba393dceb55e5ae276a87300f6b8e6f#gistcomment-1914049>
