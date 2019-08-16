---
layout: post
title: "Headless LUKS encrypted Ubuntu Server on Hetzner"
---

1. Stop active RAID:
   ```bash
   mdadm --stop /dev/md[01]
   ```
2. Destroy partition table on HDDs:
   ```bash
   dd if=/dev/zero of=/dev/sda bs=1M count=512
   dd if=/dev/zero of=/dev/sdb bs=1M count=512
   ```
3. Create new partition table:
   ```bash
   sgdisk -og /dev/sda
   ```
4. Create partitions:
   ```bash
   sgdisk -n 1:2048:+256M -t 1:fd00 /dev/sda
   sgdisk -n 128:-3M:0 -t 128:ef02 /dev/sda
   sgdisk -n 2:0:0 -t 2:fd00 /dev/sda
   ```
5. Mirror partition table to second disk:
   ```bash
   sgdisk -R /dev/sdb /dev/sda
   sgdisk -G /dev/sdb
   ```
6. Inform kernel on partition table change:
   ```bash
   partprobe
   ```
7. Create new RAID1:
   ```bash
   mdadm --create /dev/md0 --metadata=0.9 --level=1 --assume-clean --raid-devices=2 /dev/sd[ab]1
   mdadm --create /dev/md1 --metadata=1.2 --level=1 --assume-clean --raid-devices=2 /dev/sd[ab]2
   ```
8. Setup encryption on root partition:
   ```bash
   cryptsetup -c aes-xts-plain -y -s 512 -h sha512 luksFormat /dev/md1
   cryptsetup luksOpen /dev/md1 ubuntu
   ```
9. Create LVM:
   ```bash
   pvcreate /dev/mapper/ubuntu
   vgcreate ubuntu-vg /dev/mapper/ubuntu
   lvcreate -L 100GB -n root ubuntu-vg
   lvcreate -L 16GB -n swap ubuntu-vg
   lvcreate -l 100%FREE -n var ubuntu-vg
   ```
10. Format partitions:
    ```bash
    mkfs.ext2 -L boot -I 128 /dev/md0
    mkfs.ext4 -L root /dev/ubuntu-vg/root
    mkfs.ext4 -L var /dev/ubuntu-vg/var
    mkswap -L swap /dev/ubuntu-vg/swap
    ```
11. Mount root partition:
    ```bash
    mount /dev/ubuntu-vg/root /mnt
    ```
12. Mount other partitions:
    ```bsah
    mkdir /mnt/{boot,var}
    mount /dev/md0 /mnt/boot
    mount /dev/ubuntu-vg/var /mnt/var
    swapon /dev/ubuntu-vg/swap
    ```
13. Install *debootstrap*:
    ```bash
    wget http://ftp.de.debian.org/debian/pool/main/d/debootstrap/debootstrap_1.0.75_all.deb
    ar -xf debootstrap_1.0.75_all.deb
    tar -xf data.tar.gz -C /
    ```
14. Install minimal Ubuntu:
    ```bash
    debootstrap --arch=amd64 trusty /mnt http://de.archive.ubuntu.com/ubuntu
    ```
15. Set nameservers nad hostname:
    ```bash
    echo "nameserver 8.8.8.8" > /mnt/etc/resolv.conf
    echo "test" > /mnt/etc/hostname
    ```
16. Create *crypttab*:
    ```bash
    echo "ubuntu UUID=$(blkid -s UUID -o value /dev/md1) none luks" > /mnt/etc/crypttab
    ```
17. Create *fstab*:
    ```bash
    cat > /mnt/etc/fstab << EOF
    proc                        /proc   proc    defaults    0 0
    UUID=$(blkid -s UUID -o value /dev/md0)                    /boot   ext2    defaults    0 0
    UUID=$(blkid -s UUID -o value /dev/mapper/ubuntu--vg-root) /       ext4    defaults    0 1
    UUID=$(blkid -s UUID -o value /dev/mapper/ubuntu--vg-var)  /var    ext4    defaults    0 2
    UUID=$(blkid -s UUID -o value /dev/mapper/ubuntu--vg-swap)  none    swap defaults          0 0
    EOF
    ```
18. Add packages repositories:
    ```bash
    cat > /mnt/etc/apt/sources.list << EOF
    deb http://de.archive.ubuntu.com/ubuntu/ trusty main restricted universe multiverse
    deb http://de.archive.ubuntu.com/ubuntu/ trusty-security main restricted universe multiverse
    deb http://de.archive.ubuntu.com/ubuntu/ trusty-updates main restricted universe multiverse
    deb http://de.archive.ubuntu.com/ubuntu/ trusty-proposed main restricted universe multiverse
    deb http://de.archive.ubuntu.com/ubuntu/ trusty-backports main restricted universe multiverse
    EOF
    ```
19. Mount devices into new Ubuntu installation:
    ```bash
    mount -o bind /dev /mnt/dev
    mount -o bind /dev/pts /mnt/dev/pts
    mount -t sysfs /sys /mnt/sys
    mount -t proc /proc /mnt/proc
    ```
20. Chroot into new Ubuntu installation:
    ```bahs
    chroot /mnt
    ```
21. Set *root* password:
    ```bash
    passwd
    ```
22. Fix RAID device files:
    ```bash
    mkdir /dev/md
    ln -s /dev/md0 /dev/md/0
    ln -s /dev/md1 /dev/md/1
    ```
23. Copy *mtab*:
    ```bash
    cp /proc/mounts /etc/mtab
    ```
24. Install packages & *Linux* kernel:
    ```bash
    apt-get update
    apt-get upgrade -y
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
      vim \
      linux-base \
      linux-image-server \
      linux-headers-server \
      grub \
      mdadm \
      cryptsetup \
      lvm2 \
      initramfs-tools \
      openssh-server \
      dropbear
    ```
25. Disable *dropbear* after boot:
    ```bash
    update-rc.d dropbear disable
    ```
26. Enable *dropbear* for headless boot:
    ```bash
    sed -i "s/NO_START=1/NO_START=0/" /etc/default/dropbear
    ```
27. Set *initramfs* parameters:
    ```bash
    echo "DEVICE=eth0" >> /etc/initramfs-tools/initramfs.conf
    echo "export CRYPTSETUP=y" > /usr/share/initramfs-tools/conf-hooks.d/forcecryptsetup
    echo "CRYPTOPTS=target=ubuntu,source=UUID=$(blkid -s UUID -o value /dev/md1),lvm=ubuntu--vg-root" > /etc/initramfs-tools/conf.d/cryptroot
    ```
28. Remove old *dropbear* SSH keys:
    ```bash
    rm /etc/initramfs-tools/root/.ssh/id_rsa*
    ```
29. Set SSH public key:
    ```bash
    mkdir /root/.ssh
    echo "<$SSH_PUBLIC_KEY>" > /root/.ssh/authorized_keys
    ```
30. Copy SSH public key to *initramfs*:
    ```bash
    cp /root/.ssh/authorized_keys /etc/initramfs-tools/root/.ssh/
    ```
31. Download *remote-unlock* script:
    ```bash
    wget https://gist.githubusercontent.com/j7k6/409e89d512168d6df2ceff57102446c3/raw/8c6d9474a122703b9ea8adb3cd4feb05c8cf15cc/crypt_unlock.sh -O /etc/initramfs-tools/hooks/crypt_unlock.sh
    chmod +x /etc/initramfs-tools/hooks/crypt_unlock.sh
    ```
32. Update *initramfs*
    ```bash
    update-initramfs -u -k all
    ```
33. Install *GRUB* on disks:
    ```bash
    grub-install /dev/sda
    grub-install /dev/sdb
    update-grub -y
    ```
# Exit & unmount all:
    ```bash
    exit
    umount /mnt/{boot,var}
    sync
    swapoff -L swap
    reboot
    ```

---
