---
layout: post
title: "Disable Passthrough Mode for PCI Device on ESXi"
tags: [vmware,esxi,pci,passthru]
---

1. `vi /etc/vmware/esx.conf`
2. Find `/device/<PCI_ID>/owner = "passthru"`.
3. Replace `passthru` with `vmkernel`.
4. Reboot ESXi.

---
