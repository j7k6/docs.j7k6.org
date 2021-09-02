---
layout: post
title: "Gitlab Runner on Apple M1 Hardware"
---

If you follow the official [Gitlab documentation](https://docs.gitlab.com/runner/install/osx.html) to install a `gitlab-runner` instance on Apple M1 hardware, it will install the `amd64` version, which will result in this error when using the `shell` executor:

> ERROR: Job failed: exit status 1

The solution is to install it via Homebrew, which installs the correct `arm64` executable:
```bash
brew install gitlab-runner
```

To install the Runner service, this command needs to be executed inside a UI Terminal window (not in a SSH session!):
```bash
brew services start gitlab-runner
```

---
