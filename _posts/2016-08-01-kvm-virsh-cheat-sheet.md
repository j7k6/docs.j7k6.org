---
layout: post
title: "KVM/virsh Cheat Sheet"
tags: [kvm]
---

```bash
# Autostart VM
virsh autostart $VM

# "Pull Power Plug"
virsh destroy $VM

# Remove VM
virsh undefine $VM

# Create Snapshot
virsh snapshot-create-as $VM $SNAPSHOT_NAME $SNAPSHOT_DESCRIPTION

# Revert Snapshot
virsh snapshot-revert $VM $SNAPSHOT_NAME

# Delete Snapshot
virsh snapshot-delete $VM $SNAPSHOT_NAME

# Hot-Add Network Interface to VM
virsh attach-interface $VM --type bridge --model virtio --source br0 --live

# Hot-Add CD ISO
virsh attach-disk $VM $ISO_FILE hdc --type cdrom --mode readonly

# Remove CD ISO
virsh attach-disk $VM "" hdc --type cdrom --mode readonly

```

---
