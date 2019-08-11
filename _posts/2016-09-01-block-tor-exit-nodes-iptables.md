---
layout: post
title: "Block Tor Exit Nodes with IPTables"
---

1. Install `ipset`:
   ```bash
   apt-get install ipset
   ```
2. Create new *ipset*:
   ```bash
   ipset create tor iphash
   ```
3. Read Tor Exit Node List and add to *ipset*:
   ```bash
   curl -sSL "https://check.torproject.org/cgi-bin/TorBulkExitList.py?ip=$(curl icanhazip.com)" | sed '/^#/d' | while read IP; do
   ipset -q -A tor $IP
   done
   ```
   > **Note**: This should run as daily cronjob!
4. Block *ipset* with `iptables`:
   ```bash
   iptables -A INPUT -m set --match-set tor src -j DROP
   ```

---
1. <http://mikhailian.mova.org/node/194>
