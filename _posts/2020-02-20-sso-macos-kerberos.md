---
layout: post
title: "Kerberos Authentication on macOS (SSO)"
fav: 1
---

## Kerberos Tickets
To enable Kerberos authentification, a Kerberos ticket needs to be generated on the macOS client. This ticket can be aquired on the commandline (or use the `Ticket Viewer.app` GUI version):

```bash
kinit <$USERNAME>@EXAMPLE.org
```

Unfortunately, Kerberos tickets are only vaid for a couple of hours, but macOS doesn't automatically renew them. There is a free tool for that: [Kerberos Ticket Autorenewal](https://apps.apple.com/app/id1246781916).

## Browser Configuration
### Chrome
Run these commands and restart Chrome:
```bash
defaults write com.google.Chrome AuthServerWhitelist '*.example.org'
defaults write com.google.Chrome AuthNegotiateDelegateWhitelist '*.example.org'
```

### Firefox:
Go to `about:config` and apply the following settings:

- `network.automatic-ntlm-auth.trusted-uris` → *https://test.example.org*
- `network.negotiate-auth.delegation-uris` → *https://test.example.org*
- `network.negotiate-auth.trusted-uris` → *https://test.example.org*

### Safari
Safari doesn't need any further configruation.

---
1. <https://www.jeffgeerling.com/blogs/jeff-geerling/kerberos-authentication-mac-os>
