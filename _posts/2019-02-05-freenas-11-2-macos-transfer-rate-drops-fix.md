---
layout: post
title: "Fix Transfer Rate Drops when Transferring Data from FreeNAS 11.2 to macOS"
fav: 1
---

### Problem: 
Somewhere between **FreeNAS** 11.1 U6 and 11.2 U1, a change merged from *FreeBSD* (some kind of network throttling) results in *macOS* clients having problems with a significant drop in tranfer rates.

### Solution:
Run `sysctl net.inet.tcp.reass.maxqueuelen=4096` in a FreeNAS shell.

To make the change permanent, go to *System* -> *Tunables* in the FreeNAS WebUI.
Add a variable: `net.inet.tcp.reass.maxqueuelen` with value `4096` and type `Sysctl`.

---
1. <https://forums.freenas.org/index.php?threads/11-1u6-update-transfer-aborts-on-smb-share-mac-client.69553/post-481046>
2. <https://www.freebsd.org/security/advisories/FreeBSD-SA-18:08.tcp.asc>
