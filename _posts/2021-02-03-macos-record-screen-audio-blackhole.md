---
layout: post
title: "Record Screen with Audio on macOS with BlackHole"
fav: 1
---

When recording a video of the screen with `Screenshot.app` on macOS, there is no audio recorded with it by default. To be able to also grab the audio-output, the systems audio needs to be re-routed through a virtual loopback device. There is a simple & free solution for this by *ExistentialAudio*: [**BlackHole**](https://github.com/ExistentialAudio/BlackHole).

Follow these steps to setup *BlackHole*:

1. Install *BlackHole 2ch*.
2. Open macOS' `Audio MIDI Setup.app`.
3. Create a *Multi-Output Device*:
   ![blackhole](/files/macos-record-screen-audio-blackhole/01-blackhole.png)
4. Select *Build-in Output* and *BlackHole 2ch* as audio devices:
   ![blackhole](/files/macos-record-screen-audio-blackhole/02-blackhole.png)
5. Open `Screenshot.app` and select *Record Selected Portion*... and select a portion of the screen to record.
6. Select *BlackHole 2ch* as Microphone:
   ![blackhole](/files/macos-record-screen-audio-blackhole/03-blackhole.png)
7. Hit *Record*.

---
1. <https://github.com/ExistentialAudio/BlackHole/wiki/Multi-Output-Device>
