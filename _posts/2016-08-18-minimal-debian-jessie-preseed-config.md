---
layout: post
title: "Minimal Debian Jessie Preseed Config"
tags: [debian, linux]
---

`preseed.cfg`:
```
# language / locales
d-i debian-installer/language string en
d-i debian-installer/country string DE
d-i debian-installer/locale string en_US.UTF-8
d-i keyboard-configuration/xkb-keymap select de

# network
d-i netcfg/choose_interface select eth0
d-i netcfg/get_hostname string debian
d-i netcfg/get_domain string local

# mirror
d-i mirror/country string de
d-i mirror/http/hostname string ftp.halifax.rwth-aachen.de
d-i mirror/http/directory string /debian
d-i mirror/http/proxy string

# user
d-i passwd/make-user boolean false
d-i passwd/root-password-crypted password <$CRYPTED_ROOT_PASSWORD>

# time
d-i clock-setup/utc boolean true
d-i time/zone string Europe/Berlin
d-i clock-setup/ntp boolean true
d-i clock-setup/ntp-server string 0.de.pool.ntp.org

# disk
d-i partman-auto/disk string /dev/sda
d-i partman-auto/method string regular
d-i partman-auto/choose_recipe select atomic
d-i partman-partitioning/confirm_write_new_label boolean true
d-i partman/choose_partition select finish
d-i partman/confirm boolean true
d-i partman/confirm_nooverwrite boolean true

# packages
tasksel tasksel/first multiselect standard
d-i pkgsel/include string openssh-server build-essential
d-i pkgsel/upgrade select full-upgrade
popularity-contest popularity-contest/participate boolean false

# grub
d-i grub-installer/only_debian boolean true
d-i grub-installer/bootdev string /dev/sda

#reboot
d-i finish-install/reboot_in_progress note
```

---
