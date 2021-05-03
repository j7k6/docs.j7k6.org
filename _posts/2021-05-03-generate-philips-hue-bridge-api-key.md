---
layout: post
title: "Generate Philips Hue Bridge API Key"
---

Press Button on the Hue Bridge and keep it pressed while executing

```bash
curl -X POST --data '{"devicetype": "<$API_KEY_NAME>"}' http://<$HUE_BRIDGE_IP>/api/
```

---
