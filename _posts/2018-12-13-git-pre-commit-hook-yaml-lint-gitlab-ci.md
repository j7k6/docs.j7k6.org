---
layout: post
title: "Lint .gitlab-ci.yml before Commiting Changes to Git Repository"
---

Sometimes, making changes to the Gitlab CI pipeline config (`.gitlab-ci.yml`) can be quite annoying if you push to the repo and the pipeline fails because of invalid *YAML*. To prevent this, add a *pre-commit* hook to the local repository folder.

1. Install `yamllint`:
   ```bash
   brew install yamllint
   ```
2. Create `.git/hooks/pre-commit`:
   ```
   #!/bin/sh
   yamllint -d relaxed .gitlab-ci.yml
   ```
3. Make hook *executable*:
   ```bash
   chmod u+x .git/hooks/pre-commit
   ```

When `git commit` is executed, the pre-commit hook will test if the `.gitlab-ci.yml` YAML is valid and will cancel the commit if it fails.

---
