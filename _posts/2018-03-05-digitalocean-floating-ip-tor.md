---
layout: post
title: "Run Tor Relay on a DigitalOcean Droplet with Floating IP"
tags: [tor,digital-ocean]
---

If you have some spare bandwith on your [DigitalOcean](https://www.digitalocean.com) Droplet, it makes sense to run a [Tor](https://www.torproject.org) relay on it (**NOT** an *exit node*!).

But simply running a Tor relay on the Droplet would render the server's public IP address unusable because it will land on all kinds of blacklists, so especially mail servers will suffer from that.
Unfortunately, DigitalOcean doesn't offer additional IPs for Droplets. But they have a neat little feature called "*Foating IP*", which is normally used for load balancing purposes. If one floating IP is assigned to one droplet, you can use it like kind of a second public IP address.

### Floating IP
To use the *Floating IP* as additional public IP, you need to assign one to your droplet in the DigitalOcean [*Networking/Floating IPs*](https://cloud.digitalocean.com/networking/floating_ips) settings.
The floating IP is routed to the droplet's internal network address (`10.0.0.0/8`). The internal address is also called "*Anchor IP*" and will be used in the Tor configuration as outbound bind address.
To get the anchor IP, run `curl 169.254.169.254/metadata/v1/interfaces/public/0/anchor_ipv4/address` on the droplet.


### Tor
A simple `/etc/tor/torrc` configuration file for a Tor relay with the floating IP as outbound address looks like this:

```
DirPort 9030
ORPort 9001
Nickname <$RELAY_NAME>
ExitPolicy reject *:*
Address <$FLOATING_IP>
OutboundBindAddressOR <$ANCHOR_IP>
RelayBandwidthRate 250 KBytes
RelayBandwidthBurst 500 KBytes
```

---
