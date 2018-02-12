---
layout: post
title: "The First 10 Minutes on a New Debian Jessie Server"
tags: [debian, server, linux, iptables]
---

## Prerequirements
1. Change root password: `passwd`
2. Fix locale:
```bash
export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
locale-gen en_US.UTF-8
dpkg-reconfigure locales
```

3. Set parameters:
```bash
export DEBIAN_FRONTEND="noninteractive"
export EMAIL="<$EMAIL_ADDRESS>"
export MAIL_RELAY=""
export USER="<DEPLOY_USER>"
export PASSWORD="<$RANDOM_PASSWORD>"
export SSH_PUBKEY="<PUB_KEY>"
export SSH_PORT="<CUSTOM_SSH_PORT>"
```

4. Update & install packages:

```bash
apt-get update
apt-get upgrade -y

apt-get install -y \
  sudo \
  fail2ban \
  logwatch \
  vim \
  htop \
  tmux \
  postfix \
  iptables-persistent \
  build-essential \
  git \
  rkhunter \
  mosh
```

## Service Configuration

1. Postfix config:
```bash
cat > /etc/postfix/main.cf << EOF
myhostname = localhost
mydestination =
relayhost = ${MAIL_RELAY}
mynetworks = 127.0.0.0/8
inet_interfaces = loopback-only
inet_protocols = ipv4
EOF
```
```bash
cat >> /etc/aliases << EOF
root: ${EMAIL}
EOF
```
```bash
newaliases
```

2. RKHunter config:
```bash
sed -i \
    -e "/lwp-request/s/^/#/" \
    -e "/^#MAIL-ON-WARNING/s/.*/MAIL-ON-WARNING=root@localhost/" \
    /etc/rkhunter.conf
```
```bash
sed -i \
    -e 's/CRON_DAILY_RUN=""/CRON_DAILY_RUN="true"/g' \
    /etc/default/rkhunter
```
```bash
rkhunter --propupd --update
```

3. Logwatch config:
```bash
cat >> /etc/cron.daily/00logwatch << EOF
/usr/sbin/logwatch --output mail --mailto root@localhost --detail high
EOF
```

4. SSH config:
```bash
sed -i \
    -e "s/^Port .*/Port ${SSH_PORT}/g" \
    -e "s/[#]*PermitRootLogin yes/PermitRootLogin no/g" \
    -e "s/[#]*PasswordAuthentication yes/PasswordAuthentication no/g" \
    -e "s/[#]*UsePAM yes/UsePAM no/g" \
    /etc/ssh/sshd_config
```

5. Fail2Ban config:
```bash
sed -i \
    -e "s/^port.*=.*ssh/port = ${SSH_PORT}/g" \
    /etc/fail2ban/jail.conf
```

## User Setup:

1. Add user:
```bash
useradd -u 1000 -g sudo -d /home/$USER -s /bin/bash -p $(echo $PASSWORD | openssl passwd -1 -stdin) $USER
```

2. Add SSH Public Key:
```bash
mkdir -p /home/$USER/.ssh
cat > /home/$USER/.ssh/authorized_keys << EOF
$SSH_PUBKEY
EOF
```

## Networking & Firewall

1. Disable IPv6:
```bash
cat > /etc/sysctl.d/01-disable-ipv6.conf << EOF
net.ipv6.conf.all.disable_ipv6 = 1
EOF
```

2. Set IPTables Rules:

```bash
# keep ssh connection alive
iptables -P INPUT ACCEPT
iptables -P OUTPUT ACCEPT
iptables -P FORWARD ACCEPT

# reset iptables rules/chains
iptables -F
iptables -X
iptables -t nat -F
iptables -t nat -X
iptables -t mangle -F
iptables -t mangle -X

# drop everything
iptables -P INPUT DROP
iptables -P OUTPUT DROP
iptables -P FORWARD DROP

# allow local connections
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

# allow established/related connections
iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -m state --state ESTABLISHED -j ACCEPT

# prevent tcp syn attack
iptables -A INPUT -p tcp -m tcp --tcp-flags FIN,SYN,RST,PSH,ACK,URG NONE -j DROP
iptables -A INPUT -p tcp -m tcp ! --tcp-flags FIN,SYN,RST,ACK SYN -m state --state NEW -j DROP
iptables -A INPUT -p tcp -m tcp --tcp-flags FIN,SYN,RST,PSH,ACK,URG FIN,SYN,RST,PSH,ACK,URG -j DROP

# allow inbound ports
iptables -A INPUT -p tcp -m multiport --dports ${SSH_PORT} -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -p tcp -m multiport --sports ${SSH_PORT} -m state --state ESTABLISHED -j ACCEPT

# allow mobile-shell
iptables -A INPUT -p udp -m multiport --dports 60000:61000 -j ACCEPT

# allow outbound ports
iptables -A OUTPUT -p tcp -m multiport --dports 22,25,80,443,123,11371 -m state --state NEW -j ACCEPT

# allow outbound dns
iptables -A INPUT -p udp --sport 53 -j ACCEPT
iptables -A OUTPUT -p udp --dport 53 -j ACCEPT

# allow outbound traceroute
iptables -A OUTPUT -p udp --sport 32769:65535 --dport 33434:33523 -m state --state NEW -j ACCEPT

# allow inbound ping
iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT
iptables -A OUTPUT -p icmp --icmp-type echo-reply -j ACCEPT

# allow outbound ping
iptables -A OUTPUT -p icmp --icmp-type echo-request -j ACCEPT
iptables -A INPUT -p icmp --icmp-type echo-reply -j ACCEPT

# drop everything else
iptables -A INPUT -j DROP
iptables -A OUTPUT -j DROP
iptables -A FORWARD -j DROP
```

3. Save IPTables Rules:
```bash
iptables-save > /etc/iptables/rules.v4
```

4. `reboot`

---
1. [http://www.codelitt.com/blog/my-first-10-minutes-on-a-server-primer-for-securing-ubuntu/](http://www.codelitt.com/blog/my-first-10-minutes-on-a-server-primer-for-securing-ubuntu/)
2. [https://www.inversoft.com/guides/2016-guide-to-user-data-security](https://www.inversoft.com/guides/2016-guide-to-user-data-security)
3. [https://plusbryan.com/my-first-5-minutes-on-a-server-or-essential-security-for-linux-servers](https://plusbryan.com/my-first-5-minutes-on-a-server-or-essential-security-for-linux-servers)
