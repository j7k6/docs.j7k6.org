---
layout: post
title: "Stream Raspberry Pi Camera over the network with Netcat and Mplayer"
tags: [raspberry-pi,netcat,mplayer]
---

This is useful to preview the camera on a headless *Raspberry Pi (Zero W)* over the network.

### Client:
```bash
nc -l 5001 | mplayer -fps 40 -cache 1024 -
```

### Raspberry Pi:
```bash
raspivid -n -hf -vf -fps 25 -w 640 -h 480 -fl -t 0 -o - | nc <$CLIENT_IP> 5001
```

---
1. <http://myrobotlab.org/content/testing-streaming-rpi-camera-mplayer-my-pc>
