---
layout: post
title: "Remove Device from Unifi Controller on a Dream Machine Pro When Stuck in a 'Adoption failed'-Loop"
---

1. Connect to Unifi Dream Machine Pro via SSH.
2. *(Optional)* If MAC address of stuck device is unknown, search for it:
   ```bash
   docker exec unifi-os mongo --port 27117 ace --eval 'db.device.find()'
   ```
3. Remove device:
   ```bash
   docker exec unifi-os mongo --port 27117 ace --eval 'db.device.remove({"mac":"<$MAC_ADDRESS>"})'
   ```
4. Restart Unifi Controller service:
   ```bash
   docker exec unifi-os service unifi restart
   ```

---
