---
layout: post
title: "Enable PCI Passthrough for Intel 82575GB NIC in VMWare ESXi"
tags: [vmware, esxi, intel-82575gb, fix, pci-passthrough]
---

> *Manage > System > Advanced settings*

Set `VMkernel.Boot.disableACSCheck` to `True`.

---
1. [https://vmwarehints.blogspot.de/2012/10/pci-passthrough-direct-io-or-sr-iov.html](https://vmwarehints.blogspot.de/2012/10/pci-passthrough-direct-io-or-sr-iov.html)
