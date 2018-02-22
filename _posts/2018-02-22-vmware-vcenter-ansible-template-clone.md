---
layout: post
title: "Create VM from Template in VMware vCenter with Ansible"
tags: [vmware,vcenter,ansible]
---

```
---
- name: "Clone VM Template"
  hosts: "localhost"
  gather_facts: false
  become: false

  vars:
      vcenter_hostname: "<$VCENTER_HOSTNAME>"
	  vcenter_username: "<$VCENTER_USERNAME>"
	  vcenter_password: "<$VCENTER_PASSWORD>"
	  vcenter_datacenter: "<$VCENTER_DATACENTER>"
	  vcenter_esxi_host: "<$VCENTER_ESXI_HOST>"

  tasks:
  - name: "Clone new VM from Template"
    vsphere_guest:
      validate_certs: no
      vcenter_hostname: "{{vcenter_hostname}}"
      username: "{{vcenter_username}}"
      password: "{{vsphere_password}}"
      guest: "<$VM_NAME>"
      from_template: yes
      template_src: "<$TEMPLATE_NAME>"
      esxi:
        datacenter: "{{vcenter_datacenter}}"
        hostname: "{{vcenter_esxi_host}}"
```

---
