---
layout: post
title: "Network File Replication with GlusterFS Between 2 Ubuntu Servers"
fav: 1
---

### Prerequirements
Follow those steps on both servers:

1. Install GlusterFS packages:
   ```bash
   add-apt-repository ppa:gluster/glusterfs-5
   apt update
   apt install -y glusterfs-server
   ```
2. Add both servers to `/etc/hosts`:
   ```bash
   cat >> /etc/hosts << EOF
   <$NODE1_IP> node1
   <$NODE2_IP> node2
   EOF
   ```
3. Create Mountpoints:
   ```bash
   mkdir -p /data /mnt/glusterfs
   
   cat >> /etc/fstab << EOF
   <$NODE>:/gv0 /mnt/glusterfs glusterfs defaults,_netdev 0 0
   EOF
   ```

### GlusterFS
Run these commands on the first server only:

1. Add peer:
   ```bash
   gluster peer probe node2
   ```
2. Create volume:
   ```bash
   gluster volume create gv0 replica 2 transport tcp node1:/data node2:/data force
   ```
3. Start volume:
   ```bash
   gluster volume start gv0
   ```

To mount The volumes run `mount /mnt/glusterfs` on each server.

---
