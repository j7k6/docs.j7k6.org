---
layout: post
title: "Allow only specific IPs for SSH Access in ESXi Firewall"
tags: [vmware, esxi, ssh, firewall]
---

## Add Rule
```sh
esxcli network firewall ruleset set --ruleset-id sshServer --allowed-all false
esxcli network firewall ruleset allowedip add --ruleset-id sshServer --ip-address <$NET_IP>/<$NET_MASK>
```

## List Rules
```sh
esxcli network firewall ruleset allowedip list --ruleset-id sshServer
```

---
