---
layout: post
title: "Install Windows Server 2012 R2 on KVM"
---

1. Conncet to host with SSH and VNC port tunnel:
   ```bash
   ssh <$USER>@<$HOST> -L 5901:localhost:5901
   ```
2. Create disk image:
   ```bash
   qemu-img create -f qcow2 /var/lib/libvirt/images/win12r2.qcow2 32G
   ```
3. Download Virtio ISO:
   ```bash
   curl -sSL https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso > /var/lib/libvirt/images/iso/virtio-win.iso
   ```
4. Create VM:
   ```bash
   virt-install \
   --name win12r2 \
   --ram 2048 \
   --vcpus=2 \
   --disk path=/var/lib/libvirt/images/win12r2.qcow2,format=qcow2 \
   --network 'model=virtio,bridge=br0' \
   --graphics vnc,port=5901,password=test \
   --disk 'device=cdrom,path=/var/lib/libvirt/images/iso/SW_DVD9_NTRL_Windows_Svrs_2012_R2_English_2_FPP_OEM_Std_DC_X19-82429.ISO' \
   --disk 'device=cdrom,path=/var/lib/libvirt/images/iso/virtio-win.iso'  \
   --os-type=windows \
   --os-variant=win2k12r2 \
   --boot cdrom,hd 
   ```
5. Connect VNC on `localhost:5901`.

---
