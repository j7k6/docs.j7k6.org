---
layout: post
title: "Enable VNC for VMs in ESXi"
tags: [vmware,esxi,vnc]
---

Instead of using the flakey ESXi HTML5 console viewer to attach to a VM's display, it's possible to use VNC for that.
Since this is not officially supported by VMWare, the steps to activate VNC are only possible on the command line.

1. To open VNC ports in the ESXi firewall, edit `/etc/vmware/firewall/vncServer.xml`:
   ```
   <ConfigRoot>
     <service>
       <id>vncServer</id>
       <rule id='0000'>
         <direction>inbound</direction>
         <protocol>tcp</protocol>
         <porttype>dst</porttype>
         <port>
           <begin>5900</begin>
           <end>5999</end>
         </port>
       </rule>
       <enabled>true</enabled>
       <required>false</required>
     </service>
   </ConfigRoot>
   ```
2. Refresh firewall rules:
   ```bash
   esxcli network firewall refresh
   ```
3. Power-off VM.
4. Add those lines to the VM's *.vmx* configuration file:
   > RemoteDisplay.vnc.enabled = "TRUE"
   > RemoteDisplay.vnc.port = "5901"
   > RemoteDisplay.vnc.password = "$PASSWORD"
5. Power-on VM.
6. Connect to VM display with a VNC client via `<$ESX_HOST>:5901`.

---
1. [https://www.hostingjamaica.com/knowledgebase/10078/How-do-I-enable-VNC-access-for-my-Esxi-hosts.html](https://www.hostingjamaica.com/knowledgebase/10078/How-do-I-enable-VNC-access-for-my-Esxi-hosts.html)
