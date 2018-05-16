---
layout: post
title: "Fix NFS 'Portmapper not running' Error on Debian Jessie"
tags: [debian, linux, nfs, fix]
---

1. Edit `/etc/systemd/system/nfs-common.services`:
   ```
   [Unit]
   Description=NFS Common daemons
   Wants=remote-fs-pre.target
   DefaultDependencies=no

   [Service]
   Type=oneshot
   RemainAfterExit=yes
   ExecStart=/etc/init.d/nfs-common start
   ExecStop=/etc/init.d/nfs-common stop

   [Install]
   WantedBy=sysinit.target
   ```
2. Edit `/etc/systemd/system/rpcbind.service`:
   ```
[Unit]
Description=RPC bind portmap service
After=systemd-tmpfiles-setup.service
Wants=remote-fs-pre.target
Before=remote-fs-pre.target
DefaultDependencies=no

[Service]
ExecStart=/sbin/rpcbind -f -w
KillMode=process
Restart=on-failure

[Install]
WantedBy=sysinit.target
Alias=portmap
   ```
3. Enable Services & Reboot:
   ```bash
sudo systemctl enable nfs-common
sudo systemctl enable rpcbind
sudo reboot 
   ```

---
1. [https://github.com/geerlingguy/raspberry-pi-dramble/issues/65#issuecomment-283046966](https://github.com/geerlingguy/raspberry-pi-dramble/issues/65#issuecomment-283046966)
