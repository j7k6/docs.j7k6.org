---
layout: post
title: "Private Internet Access OpenVPN on Linux (Debian/Raspbian/Ubuntu)"
---

1. Install packages:
   ```bash
   sudo apt update
   sudo apt install -y openvpn unzip wget
   ```
2. Download *PIA* OpenVPN configs:
   ```bash
   wget https://www.privateinternetaccess.com/openvpn/openvpn.zip
   ```
3. Extract *PIA* OpenVPN configs:
   ```bash
   sudo unzip openvpn.zip -d /etc/openvpn/pia
   ```
4. Copy desired *PIA* profile to `/etc/openvpn/pia.conf`:
   ```bash
   sudo cp /etc/openvpn/pia/<$PIA_PROFILE>.ovpn /etc/openvpn/pia.conf
   ```
5. Change line in `/etc/openvpn/pia.conf`:
   ```bash
   sudo sed -i 's/^auth-user-pass$/auth-user-pass \/etc\/openvpn\/pia.auth/' /etc/openvpn/pia.conf
   ```
6. Create *PIA* credential file `/etc/openvpn/pia.auth`:
   ```
   <$PIA_USERNAME>
   <$PIA_PASSWORD>
   ```
7. Restrict access to `/etc/openvpn/pia.auth`:
   ```bash
   sudo chmod 0400 /etc/openvpn/pia.auth
   ```
8. Enable and start OpenVPN service:
   ```bash
   sudo systemctl enable --now openvpn@pia.service
   ```

---
