---
layout: post
title: "Disable IPv6 on Debian/Ubuntu"
tags: [ipv6, debian, ubuntu, network, kernel, linux]
---

### Disable IPv6
```bash
cat << EOF > /etc/sysctl.d/20-disable-ipv6.conf
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1
net.ipv6.conf.eth0.disable_ipv6 = 1
EOF
```

### Activate Changes
```bash
sysctl -p /etc/sysctl.d/20-disable-ipv6.conf
```

---
