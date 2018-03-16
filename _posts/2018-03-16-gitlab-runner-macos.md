---
layout: post
title: "Test Gitlab Runner Tasks Locally on macOS"
tags: [gitlab,gitlab-runner,ci,macos]
---

1. Install `brew upgrade gitlab-ci-multi-runner`:
   ```bash
   brew install gitlab-ci-multi-runner
   ```
2. Run task (`<$EXECUTOR>`: *docker*, *shell*,...):
   ```bash
   gitlab-runner exec <$EXECUTOR> <$TASK>
   ```

---
