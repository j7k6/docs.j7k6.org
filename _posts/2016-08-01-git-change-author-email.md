---
layout: post
title: "Change Author/Email in Git Repo for all Commits"
tags: [git]
---

### Change Specific Author
```bash
export NEW_EMAIL="<NEW_EMAIL>"
export NEW_NAME="<NEW_NAME>"

git filter-branch --env-filter 'if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]; then
  GIT_AUTHOR_EMAIL=$NEW_EMAIL;
  GIT_AUTHOR_NAME="$NEW_NAME";
  GIT_COMMITTER_EMAIL=$GIT_AUTHOR_EMAIL;
  GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"; fi' -- --all
```

### Change All
```bash
export NEW_EMAIL="<NEW_EMAIL>"
export NEW_NAME="<NEW_NAME>"

git filter-branch --env-filter '
  GIT_AUTHOR_EMAIL=$NEW_EMAIL;
  GIT_AUTHOR_NAME="$NEW_NAME";
  GIT_COMMITTER_EMAIL=$GIT_AUTHOR_EMAIL;
  GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"; fi' -- --all
```

---
1. [http://stackoverflow.com/a/4982271](http://stackoverflow.com/a/4982271)
