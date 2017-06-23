---
layout: post
title: "Convert VMWare ESXi Thick Provisioned Disk to Thin"
tags: [vmware, esxi]
---

1. Power-off VM
2. Convert VMDK to *thin provisioned* on ESXi:
   ```bash
   vmkfstools -i $THICK_VMDK -d thin $THIN_VMDK
   ```
3. Replace *$THICK_VMDK* with *$THIN_VMDK* in the VM settings
4. Power-on VM
5. Login to VM to zero disk space:
   - **Linux**:
      ```bash
      dd if=/dev/zero of=/zero bs=64m
      rm -f /zero
      ```
   - **Windows**:
     - Download [*sdelete*](http://technet.microsoft.com/en-us/sysinternals/bb897443.aspx)
     - run `sdelete -z c:`
6. Power-off VM and login to ESXi via SSH to *punchzero* the thin disk:
   ```bash
   vmkfstools -K $THIN_VMDK
   ```
7. Power-on VM
8. Delete *$THICK_VMDK* from datastore

---
