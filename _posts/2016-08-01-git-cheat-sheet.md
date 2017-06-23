---
layout: post
title: "Git Cheat Sheet"
tags: [git]
---

```bash
# Show global config
git config --global --list

# Show repo config
git config --list

# Set username & email
git config [--global] user.name "$NAME"
git config [--global] user.email "$EMAIL"

# Set default editor for commit messages
git config --global core.editor vim

# Use OS X Keychain as credential store
git config --global credential.helper osxkeychain

# Set GPG key for signing
git config --global user.signingkey $GPG_KEY_ID

# Sign commit with GPG
git commit -S -am "$COMMIT_MESSAGE"

# Set remote URL
git remote add origin git@github.com:$USER/$REPO.git

# Change remote URL
git remote set-url origin git@github.com:$USER/$REPO.git

# Create branch
git checkout -b $BRANCH

# Reset changes to last commit
git reset --hard HEAD

# Reset to specific commit
git reset --hard $COMMIT_SHA

# Merge fork with upstream repo changes
git checkout master
git fetch upstream
git merge upstream/master
git push origin master

# Shallow Clone
git clone --depth 1 $REPO_URL
```

---
