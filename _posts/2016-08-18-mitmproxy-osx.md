---
layout: post
title: "Mitmproxy on OS X"
---

1. Install **mitmproxy**:
   ```bash
   brew install mitmproxy
   ```
2. Enable IP forwarding and `pf` redirection:
   ```bash
   sudo sysctl -w net.inet.ip.forwarding=1
   echo "rdr on en inet proto tcp to any port 80 -> 127.0.0.1 port 8080" | sudo pfctl -v -ef -
   echo "rdr on en2 inet proto tcp to any port 443 -> 127.0.0.1 port 8080" | sudo pfctl -v -ef -
   ```
3. Run `mitmproxy`
4. Send `~/.mitmproxy/mitmproxy-ca-cert.pem` to iPhone by mail & install the certificate.
5. Set *HTTP Proxy* in iPhone WLAN settings:
   - *Server*: `<$HOST_IP>`
   - *Port*: `8080`

---
