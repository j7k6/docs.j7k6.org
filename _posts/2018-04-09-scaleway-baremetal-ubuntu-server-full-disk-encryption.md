---
layout: post
title: "Scaleway Baremetal Ubuntu Server with Full Disk Encryption"
tags: [scaleway,encryption,security,luks,linux,ubuntu]
fav: 1
---

[**Scaleway**](https://www.scaleway.com/) offers some cheap baremetal x86 servers (*C2S*, *C2M*, *C2L*). Since this servers are not virtualized, there is no way an encryption key can be leaked to a hypervisor. So unlike normal (virtualized) cloud VPS's, *Full Disk Encryption* is much more secure on a baremetal server, because you "own" the hardware (yes, only theoretically, direct access to the hardware is still an attack surface, but the desired level of security depends on the threat model).

In this post I will describe how I managed to get a *Ubuntu Server* running on a *LUKS*-encrypted disk on a *baremetal* Scaleway server.

> **Note**: The *C2S* and *C2M* server models use a *Network Block Device* (**/dev/nbdX**), while the *C2L* model uses a directly attached SSD (**/dev/sdX**). This post focuses on the *NBD* disks.

## Prerequirements
Visit the *Scaleway* [Dashboard](https://cloud.scaleway.com) to create a new **Baremetal** (**x86**) server.

1. Server range: `Baremetal` -> `X86` -> `C2M`
2. Choose an image: `Ubuntu Xenial`
3. Additional volumes: `150GB`

![scaleway-01.png](/files/scaleway-baremetal-ubuntu-server-full-disk-encryption/scaleway-01.png)

### (Optional) Change Kernel
Usually, the default kernel is a little bit older, to change it to a more recent one, the *Bootscript* needs to be changed:
![scaleway-02.png](/files/scaleway-baremetal-ubuntu-server-full-disk-encryption/scaleway-02.png)

After changing the kernel, the server needs to *hard reboot*.

---

## Server Installation
After the new server booted up completely, it's time to SSH into it.

### System Packages
First, update the servers packages and install additional requirements:
```bash
export DEBIAN_FRONTEND=noninteractive 
apt-get update 
apt-get upgrade -y
apt-get install -y gdisk parted cryptsetup
```

### Disk Setup
1. Create partition table:
   ```bash
   sgdisk -og /dev/ndb1 
   sgdisk -n 1:0:0 -t 1:8300 /dev/nbd1
   partprobe
   ```
2. Encrypt disk:
   ```bash
   cryptsetup -c aes-xts-plain64 -y -s 512 -h sha512 luksFormat /dev/nbd1 
   cryptsetup luksOpen /dev/nbd1 ubuntu
   ```
3. Format encrypted partition:
   ```bash
   mkfs.ext4 -L root -m 0 /dev/mapper/ubuntu
   ```
4. Mount:
   ```bash
   mount /dev/mapper/ubuntu /mnt 
   ```

### Ubuntu Setup
Many tutorials would now introduce *debootstrap*, *proc*-binds and complicated setups-from-scratch, but since I want to keep it as simple as possible I just copied the existing Scaleway Ubuntu installation to the encrypted disk:
```bash
cp -avx / /mnt
```

After that, the `/etc/fstab` file needs to be set up:
```bash
echo "/dev/mapper/ubuntu / ext4 defaults 0 1" > /mnt/etc/fstab
```

And that's it!
Now cleanly unmount everything:
```bash
umount /mnt
cryptsetup luksClose ubuntu
```

### Switch Boot Device
After finishing the encrypted disk setup, the initial 50GB disk isn't needed anymore, so it can be removed from the server completely.

1. Power off / Archive (this takes some time)
2. Detach both volumes
3. Re-attach the `ubuntu-xenial-cryptroot` disk

Now the fully encrypted Ubuntu server is nearly ready to use!

---

## Remote Unlock

### Activate SSH on Boot
To remotely unlock the disk and boot from it, the lightweight SSH server *dropbear* needs to be activated. This can be done in the Scaleway Dashboard by adding a new *Tag* to the server: `INITRD_DROPBEAR=1`.
After adding the tag, power-on the server.

### Unlock Disk
The `INITRD_DROPBEAR=1` tag forces the boot process to stop and drop a busybox shell which is available via SSH.

> **Note**: Use `ssh root@<$SERVER> -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null`, or else the SSH client will complain about changed Host keys everytime the server is rebooted.

Unfortunately, Scaleway doesn't support *LUKS* out of the box in its boot stage. So before unlocking the encrypted disk and booting, the `cryptsetup` binary has to be installed in *busybox*:
```bash
wget -qO- http://dl-3.alpinelinux.org/alpine/latest-stable/main/x86_64/apk-tools-static-2.9.1-r2.apk | tar zxvf - -C /
/sbin/apk.static add -X http://dl-cdn.alpinelinux.org/alpine/edge/main --update --initdb --allow-untrusted cryptsetup
```

Now load the needed kernel modules:
```bash
mkdir -p /lib/modules/$(uname -r)
wget -qP /lib/modules/$(uname -r)/ http://mirror.scaleway.com/kernel/$(uname -m)/$(uname -r)/modules/$(uname -r)/kernel/drivers/md/dm-mod.ko
wget -qP /lib/modules/$(uname -r)/ http://mirror.scaleway.com/kernel/$(uname -m)/$(uname -r)/modules/$(uname -r)/kernel/drivers/md/dm-crypt.ko
wget -qP /lib/modules/$(uname -r)/ http://mirror.scaleway.com/kernel/$(uname -m)/$(uname -r)/modules/$(uname -r)/kernel/crypto/xts.ko # Thanks for the update @Alex / 2018-08-21
depmod -a
```

...and finally decrypt the Ubuntu disk, mount the volume and continue the boot process:
```bash
/sbin/cryptsetup luksOpen /dev/nbd0 ubuntu
mount /dev/mapper/ubuntu /newroot
continue-boot
```

---
1. **TODO**: automate unlocking
