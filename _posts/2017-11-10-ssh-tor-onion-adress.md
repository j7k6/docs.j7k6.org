---
layout: post
title: "Use .onion Address to Connect to SSH Server over Tor Hidden Service"
tags: [tor,ssh,debian,linux]
---

*Tor Hidden Services* can be used to connect to services behind firewalls or NAT without port forwardings.

## Server
### Tor Setup
1. Add `tor` package sources:
   ```bash
   cat > /etc/apt/sources.list.d/tor.list << EOF
   deb http://deb.torproject.org/torproject.org $(lsb_release -cs) main
   deb-src http://deb.torproject.org/torproject.org $(lsb_release -cs) main
   EOF
   ```
2. Add signing key:
   ```bash
   gpg --keyserver keys.gnupg.net --recv A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89
   gpg --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | sudo apt-key add -
   ```
3. Install `tor` package:
   ```bash
   apt-get install -y tor deb.torproject.org-keyring
   ```
4. Enable & start `tor` service:
   ```bash
   systemctl enable tor.service
   systemctl start tor.service
   ```

### Tor Hidden Service Configuration
1. Add to `/etc/tor/torrc`:
   ```
   HiddenServiceDir /var/lib/tor/ssh/
   HiddenServicePort 22 127.0.0.1:22
   ```
2. Restart `tor` service:
   ```bash
   systemctl restart tor.service
   ```


After restarting `tor`, there are two new files in `/var/lib/tor/hostname`:
- `hostname` (contains the hidden service hostname)
- `private_key` (back this one up!)

The SSH service is now available as Tor Hidden Service.

## Client
1. Append to `~/.ssh/config`:
   ```
   Host *.onion
     ProxyCommand nc -x 127.0.0.1:9050 -X5 %h %p
   ```
2. Run `tor`
3. Connect to SSH Hidden Service over Tor:
   ```bash
   ssh <USER>@<ONION_ADDRESS>
   ```

## (Optional)
If the SSH service should only be available as Tor Hidden Service, you can limit it to listen only on the servers loopback address (*127.0.0.1*).
For this edit `/etc/ssh/sshd_config` on the server and set `ListenAddress 127.0.0.1`. Now restart the `sshd` service (`systemctl restart ssh`) to enable the configuration.

---
