---
layout: post
title: "Unblock LDAP User in Gitlab"
tags: [ldap, gitlab]
---

```bash
su - git
export PATH=$PATH:/opt/gitlab/embedded/bin
cd /opt/gitlab/embedded/service/gitlab-rails/
bundle exec rails c production
  user = User.find_by_email("$USER_EMAIL")
  user.state = "active"
  user.save
  exit
```

Tested in dockerized Gitlab ([gitlab/gitlab-ce](https://hub.docker.com/r/gitlab/gitlab-ce/)).

---
1. [https://gitlab.com/gitlab-org/gitlab-ce/issues/13179#note_3741514](https://gitlab.com/gitlab-org/gitlab-ce/issues/13179#note_3741514)
