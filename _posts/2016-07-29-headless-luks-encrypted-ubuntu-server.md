---
layout: post
title: "Headless LUKS encrypted Ubuntu Server on Hetzner"
tags: [luks, ubuntu, encryption, hetzner, lvm, linux]
---

```bash
# stop active raid
mdadm --stop /dev/md[01]

# destroy partition table on hdds
dd if=/dev/zero of=/dev/sda bs=1M count=512
dd if=/dev/zero of=/dev/sdb bs=1M count=512

# create new partition table
sgdisk -og /dev/sda

# create boot partition
sgdisk -n 1:2048:+256M -t 1:fd00 /dev/sda

# create bios boot partition
sgdisk -n 128:-3M:0 -t 128:ef02 /dev/sda

# create root partition
sgdisk -n 2:0:0 -t 2:fd00 /dev/sda

# mirror partition table to second disk
sgdisk -R /dev/sdb /dev/sda
sgdisk -G /dev/sdb

# inform kernel on partition table change
partprobe

# mdadm --zero-superblock /dev/sd[ab][12]

# create new raid1
mdadm --create /dev/md0 --metadata=0.9 --level=1 --assume-clean --raid-devices=2 /dev/sd[ab]1
mdadm --create /dev/md1 --metadata=1.2 --level=1 --assume-clean --raid-devices=2 /dev/sd[ab]2

# setup encryption on root partition
cryptsetup -c aes-xts-plain -y -s 512 -h sha512 luksFormat /dev/md1
cryptsetup luksOpen /dev/md1 ubuntu

# create lvm
pvcreate /dev/mapper/ubuntu
vgcreate ubuntu-vg /dev/mapper/ubuntu
lvcreate -L 100GB -n root ubuntu-vg
lvcreate -L 16GB -n swap ubuntu-vg
lvcreate -l 100%FREE -n var ubuntu-vg

# format partitions
mkfs.ext2 -L boot -I 128 /dev/md0
mkfs.ext4 -L root /dev/ubuntu-vg/root
mkfs.ext4 -L var /dev/ubuntu-vg/var
mkswap -L swap /dev/ubuntu-vg/swap

# mount root partition
mount /dev/ubuntu-vg/root /mnt

# mount other partitions
mkdir /mnt/{boot,var}
mount /dev/md0 /mnt/boot
mount /dev/ubuntu-vg/var /mnt/var
swapon -L swap /dev/ubuntu-vg/swap

# install debootstrap
wget http://ftp.de.debian.org/debian/pool/main/d/debootstrap/debootstrap_1.0.75_all.deb
ar -xf debootstrap_1.0.75_all.deb
tar -xf data.tar.gz -C /

# install minimal ubuntu
debootstrap --arch=amd64 trusty /mnt http://de.archive.ubuntu.com/ubuntu

# resolv.conf / hostname
echo "nameserver 8.8.8.8" > /mnt/etc/resolv.conf
echo "test" > /mnt/etc/hostname

# crypttab
echo "ubuntu UUID=$(blkid -s UUID -o value /dev/md1) none luks" > /mnt/etc/crypttab

# fstab
cat > /mnt/etc/fstab << EOF
proc                        /proc   proc    defaults    0 0
UUID=$(blkid -s UUID -o value /dev/md0)                    /boot   ext2    defaults    0 0
UUID=$(blkid -s UUID -o value /dev/mapper/ubuntu--vg-root) /       ext4    defaults    0 1
UUID=$(blkid -s UUID -o value /dev/mapper/ubuntu--vg-var)  /var    ext4    defaults    0 2
UUID=$(blkid -s UUID -o value /dev/mapper/ubuntu--vg-swap)  none    swap defaults          0 0
EOF

# sources.list
cat > /mnt/etc/apt/sources.list << EOF
deb http://de.archive.ubuntu.com/ubuntu/ trusty main restricted universe multiverse
deb http://de.archive.ubuntu.com/ubuntu/ trusty-security main restricted universe multiverse
deb http://de.archive.ubuntu.com/ubuntu/ trusty-updates main restricted universe multiverse
deb http://de.archive.ubuntu.com/ubuntu/ trusty-proposed main restricted universe multiverse
deb http://de.archive.ubuntu.com/ubuntu/ trusty-backports main restricted universe multiverse
EOF

# mount devices to new ubuntu installation
mount -o bind /dev /mnt/dev
mount -o bind /dev/pts /mnt/dev/pts
mount -t sysfs /sys /mnt/sys
mount -t proc /proc /mnt/proc

# chroot to new ubuntu installation
chroot /mnt

# set root password
passwd

# fix raid device files
mkdir /dev/md
ln -s /dev/md0 /dev/md/0
ln -s /dev/md1 /dev/md/1

# mtab
cp /proc/mounts /etc/mtab

# install packages / kernel
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

# disable dropbear after boot
update-rc.d dropbear disable

# enable dropbear for headless boot
sed -i "s/NO_START=1/NO_START=0/" /etc/default/dropbear

# set initramfs parameters
echo "DEVICE=eth0" >> /etc/initramfs-tools/initramfs.conf
echo "export CRYPTSETUP=y" > /usr/share/initramfs-tools/conf-hooks.d/forcecryptsetup
echo "CRYPTOPTS=target=ubuntu,source=UUID=$(blkid -s UUID -o value /dev/md1),lvm=ubuntu--vg-root" > /etc/initramfs-tools/conf.d/cryptroot

# remove old dropbear ssh keys
rm /etc/initramfs-tools/root/.ssh/id_rsa*

# set ssh public key
mkdir /root/.ssh
echo "$SSH_PUBLIC_KEY" > /root/.ssh/authorized_keys

# copy ssh public key to initramfs
cp /root/.ssh/authorized_keys /etc/initramfs-tools/root/.ssh/

# download unlock script
wget https://gist.githubusercontent.com/jkullick/d81b4e93ec128bed217e/raw/e7cbbe640e5263ad6c73dbb02a601588578ba4c1/crypt_unlock.sh -O /etc/initramfs-tools/hooks/crypt_unlock.sh
chmod +x /etc/initramfs-tools/hooks/crypt_unlock.sh

# update initramfs
update-initramfs -u -k all

# install grub
grub-install /dev/sda
grub-install /dev/sdb
update-grub -y

exit

# unmount all
umount /mnt/{boot,var}
sync
swapoff -L swap
reboot
exit
```

---
