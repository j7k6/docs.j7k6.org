---
layout: post
title: "Modify Git Commit Timestamp for all Commits"
tags: [git]
---

```bash
# set time to 00:00:00, but keep dates
git filter-branch -f --env-filter \
  "
  export GIT_AUTHOR_DATE=\$(echo \$GIT_AUTHOR_DATE | awk '{print substr(\$1,2)}' | xargs -I {} date -r {} +'%a %b %Oe %T %Y +0000' | awk '{gsub(/[0-9]{2}:[0-9]{2}:[0-9]{2}/, "\""00:00:00"\""); gsub(/  /, "\"" "\""); print}');
  export GIT_COMMITTER_DATE=\$GIT_AUTHOR_DATE;
  "
```

---
