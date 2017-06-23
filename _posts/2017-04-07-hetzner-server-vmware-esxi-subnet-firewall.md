---
layout: post
title: "Hetzner Server with VMWare ESXi, Subnet and Firewall"
tags: [hetzner, vmware, esxi, virtualization, network, ip, firewall, pfsense]
---

## Prerequirements:
- 1x Server with Hardware RAID & Intel Xeon CPU 
- 1x additional IP for Firewall VM outbound NIC (Request Seperate MAC for Firewall)
- 1x additional /29 subnet for 6 VM IPs (Routing to additional IP)
- 1x VMWare ESXi Free License ([https://my.vmware.com/en/group/vmware/evalcenter?p=free-esxi6](https://my.vmware.com/en/group/vmware/evalcenter?p=free-esxi6))

## LARA: RAID Setup, ESXi Installation
1. Request LARA Console for Server
2. Set ESXi ISO in LARA Interface Setting: *Interfaces -> Virtual Media -> Image on Windows Share*
    - Share Host/IP: `mirror.hetzner.de`
    - Share Name: `vmware`
    - Image File with Path: `VMware-VMvisor-Installer-6.5.0-4564106.x86_64.iso`
3. Restart Server, boot into RAID Configuration to set-up RAID
4. Reboot & Install ESXi
5. Eject ISO & Reboot Server

## VMWare ESXi 6.5 Setup
1. Enable SSH in `Troubleshooting Options`.
2. Quit LARA
3. Connect to server via SSH
4. Download ISOs to Datastore:
   ```
   cd /vmfs/volumes/datastore1/
   mkdir ISO
   cd ISO
   wget http://cdimage.debian.org/debian-cd/current/amd64/iso-cd/debian-8.7.1-amd64-netinst.iso
   wget http://frafiles.pfsense.org/mirror/downloads/pfSense-CE-2.3.2-RELEASE-amd64.iso.gz
   gunzip http://frafiles.pfsense.org/mirror/downloads/pfSense-CE-2.3.2-RELEASE-amd64.iso.gz
   ```
5. Open server's VMWare UI in browser

### Networking Setup
1. *Networking -> Virtual switches -> Add standard virtual switch*
    - vSwitch Name: `subnet0`
2. *Networking -> Port groups -> Add port group*
    - Name: `Subnet0`
    - Virtual switch: `subnet0`

## pfSense Firewall
1. Create new VM:
    - Name: `firewall`
    - RAM: `512 MB`
    - HDD: `8 GB`
    - NIC1: `VM Network` (static MAC: requested from Hetzner Robot, see *Prerequirements*)
    - NIC2: `subnet0`
    - DVD: ISO (`pfSense-CE-2.3.2-RELEASE-amd64.iso`)
2. Install `pfSense`
    - First network interface: Additional IP
    - Second network interface: IP from /29 Subnet
3. Configure `pfSense` via Web UI

---
