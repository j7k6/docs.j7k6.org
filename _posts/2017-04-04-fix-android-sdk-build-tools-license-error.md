---
layout: post
title: "Fix Android SDK/Build Tools License Error"
tags: [android, sdk]
---

```bash
mkdir -p $ANDROID_HOME/licenses/ \
  && echo "8933bad161af4178b1185d1a37fbf41ea5269c55" > $ANDROID_HOME/licenses/android-sdk-license \
  && echo "84831b9409646a918e30573bab4c9c91346d8abd" > $ANDROID_HOME/licenses/android-sdk-preview-license
```

---
1. [https://gitlab.com/gitlab-org/gitlab-ci-multi-runner/issues/1956#note_22781429](https://gitlab.com/gitlab-org/gitlab-ci-multi-runner/issues/1956#note_22781429)
