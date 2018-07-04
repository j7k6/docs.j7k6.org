---
layout: post
title: "Fix 'No Space left on Device' Error when Upgrading VMware ESXi"
tags: [vmware,esxi,fix]
---

When [upgrading to *ESXi 6.7.0*](/vmware-esxi-upgrade-6-5-0-6-7-0/) this error occured:
> [InstallationError]  
> [Errno 28] No space left on device  
>       vibs = VMware_locker_tools-light_10.2.0.7253323-8169922  
> Please refer to the log file for more details.

It can be fixed by manually installing the *VMware_locker_tools-light_10.2.0.7253323-8169922* VIB:

```bash
cd /tmp
wget http://hostupdate.vmware.com/software/VUM/PRODUCTION/main/esx/vmw/vib20/tools-light/VMware_locker_tools-light_10.2.0.7253323-8169922.vib
esxcli software vib install -f -v /tmp/VMware_locker_tools-light_10.2.0.7253323-8169922.vib
```

---
1. <https://blog.friedlandreas.net/2018/05/vmware-upgrade-errno-28-no-space-left-on-device/>
