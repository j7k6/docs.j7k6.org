---
layout: post
title: "Route everything through Tor with Iptables inside Docker Container"
tags: [tor, docker, security, linux, iptables]
---

### Dockerfile
```
FROM debian:jessie

ENV DEBIAN_FRONTEND noninteractive

RUN echo "deb http://deb.torproject.org/torproject.org jessie main" > /etc/apt/sources.list.d/tor.list \
  && gpg --keyserver keys.gnupg.net --recv A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 \
  && gpg --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | apt-key add -

RUN apt-get update \
  && apt-get install -yqq \
    tor \
    deb.torproject.org-keyring \
    build-essential \
    curl \
    git \
    vim \
    sudo

COPY config/torrc /etc/tor/torrc
COPY config/iptables.sh /etc/iptables.sh

CMD /bin/sh /etc/iptables.sh; echo "nameserver 127.0.0.1" > /etc/resolv.conf; sudo -u debian-tor bash -c tor
```

### Config files

- `config/torrc`:
  ```
  VirtualAddrNetworkIPv4 10.192.0.0/10
  AutomapHostsOnResolve 1
  TransPort 9040
  DNSPort 5353
  ```
- `config/iptables.sh`
  ```
  #!/bin/sh

  _out_if="eth0"
  _tor_uid=`id -u debian-tor`
  _trans_port="9040"
  _dns_port="5353"
  _virt_addr="10.192.0.0/10"
  _non_tor="127.0.0.0/8 10.0.0.0/8 172.16.0.0/12 192.168.0.0/16"
  _resv_iana="0.0.0.0/8 100.64.0.0/10 169.254.0.0/16 192.0.0.0/24 192.0.2.0/24 192.88.99.0/24 198.18.0.0/15 198.51.100.0/24 203.0.113.0/24 224.0.0.0/3"

  iptables -F
  iptables -t nat -F

  iptables -t nat -A OUTPUT -d $_virt_addr -p tcp -m tcp --tcp-flags FIN,SYN,RST,ACK SYN -j REDIRECT --to-ports $_trans_port
  iptables -t nat -A OUTPUT -d 127.0.0.1/32 -p udp -m udp --dport 53 -j REDIRECT --to-ports $_dns_port
  iptables -t nat -A OUTPUT -m owner --uid-owner $_tor_uid -j RETURN
  iptables -t nat -A OUTPUT -o lo -j RETURN

  for _lan in $_non_tor; do
    iptables -t nat -A OUTPUT -d $_lan -j RETURN
  done

  for _iana in $_resv_iana; do
    iptables -t nat -A OUTPUT -d $_iana -j RETURN
  done

  iptables -t nat -A OUTPUT -p tcp -m tcp --tcp-flags FIN,SYN,RST,ACK SYN -j REDIRECT --to-ports $_trans_port
  iptables -A INPUT -m state --state ESTABLISHED -j ACCEPT
  iptables -A INPUT -i lo -j ACCEPT
  iptables -A INPUT -j DROP
  iptables -A FORWARD -j DROP
  iptables -A OUTPUT -m state --state INVALID -j DROP
  iptables -A OUTPUT -m state --state ESTABLISHED -j ACCEPT
  iptables -A OUTPUT -o $_out_if -m owner --uid-owner $_tor_uid -p tcp -m tcp --tcp-flags FIN,SYN,RST,ACK SYN -m state --state NEW -j ACCEPT
  iptables -A OUTPUT -d 127.0.0.1/32 -o lo -j ACCEPT
  iptables -A OUTPUT -d 127.0.0.1/32 -p tcp -m tcp --dport $_trans_port --tcp-flags FIN,SYN,RST,ACK SYN -j ACCEPT

  for _lan in $_non_tor; do
    iptables -A OUTPUT -d $_lan -j ACCEPT
  done

  iptables -A OUTPUT -j LOG --log-prefix "Dropped OUTPUT packet: " --log-level 7 --log-uid
  iptables -A OUTPUT -j DROP
  iptables -P INPUT DROP
  iptables -P FORWARD DROP
  iptables -P OUTPUT DROP
  ```

### Run

```bash
docker build -t <IMAGE_NAME> .
docker run -d --name=<CONTAINER_NAME> --restart=always --cap-add=NET_ADMIN --cap-add=NET_RAW <IMAGE_NAME>
docker exec -it <CONTAINER_NAME> /bin/bash
```

> *Example Usage*: [A dockerized environment for using Kali Linux over Tor.](https://github.com/jkullick/kalitor)


---
1.
[https://trac.torproject.org/projects/tor/wiki/doc/TransparentProxy](https://trac.torproject.org/projects/tor/wiki/doc/TransparentProxy)
