---
layout: post
title: "Cleanup GitLab Docker Registry Images Older than X Days"
---

> **Disclaimer**: This deletes images from your Docker Registry permanently! Only use this if you know exactly what you're doing!

1. Delete *Manifests* older than 90 days:
   ```bash
   find /var/opt/gitlab/gitlab-rails/shared/registry/docker/registry/v2/repositories -regex "^.*/_manifests/\(tags\/.*\/index\|revisions\)/sha256/.*$" -type d -mtime +90 -exec rm -rf {} \; 2>/dev/null
   ```
2. Run Garbage Collector:
   ```bash
   gitlab-ctl registry-garbage-collect -m
   ```

---
