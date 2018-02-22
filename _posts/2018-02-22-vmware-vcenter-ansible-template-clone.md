---
layout: post
title: "Create VM from Template in VMware vCenter with Ansible"
tags: [vmware,vcenter,ansible]
---

> The `vsphere_guest` Ansible module requires the Python package `pysphere`.
> Install it with `pip install pysphere`.

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
      vcenter_hostname: "{% raw %}{{vcenter_hostname}}{% endraw %}"
      username: "{% raw %}{{vcenter_username}}{% endraw %}"
      password: "{% raw %}{{vsphere_password}}{% endraw %}"
      guest: "<$VM_NAME>"
      from_template: yes
      template_src: "<$TEMPLATE_NAME>"
      esxi:
        datacenter: "{% raw %}{{vcenter_datacenter}}{% endraw %}"
        hostname: "{% raw %}{{vcenter_esxi_host}}{% endraw %}"
```

---
