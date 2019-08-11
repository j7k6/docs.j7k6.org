---
layout: post
title: "Network File Replication with GlusterFS between 2 Ubuntu Servers"
fav: 1
---

## Prerequirements
Follow those steps on both servers:

1. Install GlusterFS packages:
   ```bash
   add-apt-repository ppa:gluster/glusterfs-5
   apt update
   apt install -y glusterfs-server
   ```
2. Create Mountpoints:
   ```bash
   mkdir -p /data /mnt/glusterfs
   echo "<$NODE_IP>:/gv0 /mnt/glusterfs glusterfs defaults,_netdev 0 0" >> /etc/fstab
   ```

## GlusterFS
Run these commands on the first server only:

1. Add peer:
   ```bash
   gluster peer probe <$NODE2_IP>
   ```
2. Create volume:
   ```bash
   gluster volume create gv0 replica 2 transport tcp <$NODE1_IP>:/data <$NODE2_IP>:/data force
   ```
3. Start volume:
   ```bash
   gluster volume start gv0
   ```

To mount the volumes run `mount /mnt/glusterfs` on each server.

---
