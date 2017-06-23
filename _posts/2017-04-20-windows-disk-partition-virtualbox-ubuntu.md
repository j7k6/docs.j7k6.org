---
layout: post
title: "Use Physical Windows Partition/Disk as Virtualbox Disk on Ubuntu"
tags: [ubuntu,linux,windows,virtualbox,virtualization]
---

```bash
VBoxManage internalcommands createrawvmdk -filename Win10.vmdk -rawdisk /dev/sda -partitions 1
```

---
1. [https://askubuntu.com/a/168167](https://askubuntu.com/a/168167)
2. [https://askubuntu.com/a/236483](https://askubuntu.com/a/236483)
3. [http://www.virtualbox.org/manual/ch09.html#rawdisk](http://www.virtualbox.org/manual/ch09.html#rawdisk)
