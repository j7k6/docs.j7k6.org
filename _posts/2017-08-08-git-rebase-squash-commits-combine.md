---
layout: post
title: "Git: Combine Multiple Commits Into One Commit"
tags: [git]
---

To combine ("*squash*") multiple commits into a single commit, use `git rebase -i <$AFTER_THIS_COMMIT_ID>`.

In the editor, replace every *pick* with *squash*, **except** the first one!

To overwrite the Git history on a remote, use `git push -f origin master` to force the push.

---
1. [https://stackoverflow.com/a/5189600](https://stackoverflow.com/a/5189600)
