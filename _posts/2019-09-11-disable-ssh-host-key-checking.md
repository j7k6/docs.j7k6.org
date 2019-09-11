---
layout: post
title: "Disable SSH Host Key Checking"
---

```bash
ssh -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" <$SSH_USER>@<$SSH_HOST>
```

...or, to disable SSH host key checking for every host, edit `~/.ssh/config`:
```
Host *
  StrictHostKeyChecking no
  UserKnownHostsFile=/dev/null
```

---
