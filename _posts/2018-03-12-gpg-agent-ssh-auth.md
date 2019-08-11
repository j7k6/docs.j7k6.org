---
layout: post
title: "Use GPG Key for SSH Authentication with GnuPG Agent"
tags: [gpg,ssh,macos,zsh,security]
fav: 1
---

*(only tested on macOS)*

Besides managing the GPG keychain, **GnuPG** is also able to handle SSH key authentication. This makes the native `ssh-agent` obsolete. `gpg-agent` can be used for this instead.

First, a subkey for authentication needs to be added to an existing GPG key.

## Add Subkey
1. Edit existing key in *expert* mode:
   ```bash
   gpg --expert --edit-key <$KEY_ID>
   ```
2. Type `addkey`...
   - `8`  to edit capabilities
   - `S` to toggle off the sign capability
   - `E` to toggle off the encrypt capability
   - `A` to toggle on the authenticate capability
   - `Q` to quit
   - Keysize: `4096`
   - `0` for 'never expire'
   - `save` and `quit`

## Configure zsh/bash
1. Add this lines to `~/.zshrc` or `~/.bashrc`:
   ```
   gpg-connect-agent --quiet /bye >/dev/null 2>/dev/null
   gpg-agent --daemon --quiet --enable-ssh-support >/dev/null 2>&1

   export SSH_AUTH_SOCK="$(gpgconf --list-dirs agent-ssh-socket)"
   export GPG_TTY=$(tty)
   ```
2. Kill running `gpg-agent` processes:
   ```bash
   killall -9 gpg-agent
   ```
3. Reload shell configuration:
   ```bash
   source ~/.zshrc
   ```

## Add Subkey to GPG Agent
1. Find the *keygrip* (identified by `[A]` for *authentication*):
   ```bash
   gpg --list-secret-keys --with-keygrip
   ```
2. Write the *keygrip* to the `sshcontrol` file:
   ```bash
   echo "<$KEYGRIP>" >> ~/.gnupg/sshcontrol
   ```
3. Read the public SSH key and add it to the server's `~/.ssh/authorized_keys` file:
   ```
   ssh-add -L
   ```

The SSH client now uses the `gpg-agent` to authenticate.

---
1. [https://ryanlue.com/posts/2017-06-29-gpg-for-ssh-auth](https://ryanlue.com/posts/2017-06-29-gpg-for-ssh-auth)
2. [https://linode.com/docs/security/authentication/gpg-key-for-ssh-authentication/#generating-the-authentication-subkey](https://linode.com/docs/security/authentication/gpg-key-for-ssh-authentication/#generating-the-authentication-subkey)
