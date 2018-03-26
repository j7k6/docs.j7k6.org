---
layout: post
title: "Fix Gitlab CI/Docker Registry Push 'blob upload unknown' Error"
tags: [gitlab,docker,fix]
---

When moving a **Gitlab CE** instance to a new server and upgrading to version *10.6*, all deployments started to fail because somehow the internal routing to the registry had changed.
When a deployment task tried to push a Docker image to the internal registry, it always failed with a  `blob upload unknown` error message.

To fix this error, I had to add this line to the `gitlab.rb` configuration file:

```
registry_nginx['proxy_set_headers'] = { "Host" => "<$GITLAB_HOSTNAME>:<$DOCKER_PORT>" }
```

---
1. [https://gitlab.com/gitlab-org/gitlab-ce/issues/20164#note_13270027](https://gitlab.com/gitlab-org/gitlab-ce/issues/20164#note_13270027)
