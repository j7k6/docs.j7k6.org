---
layout: post
title: "Basic Systemd Service File"
---

1. Edit `/etc/systemd/system/<$SERVICE_NAME>.service`:
   ```
   [Unit]
   Description=<$SERVICE_DESCRIPTION>
   
   [Service]
   ExecStart=<$SERVICE_COMMAND>
   
   [Install]
   WantedBy=multi-user.target
   ```
2. Reload Systemd config:
   ```bash
   systemctl daemon-reload
   ```
3. Enable & start service:
   ```bash
   systemctl enable --now <$SERVICE_NAME>.service
   ```

---
