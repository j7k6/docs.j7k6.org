---
layout: post
title: "Compile FFMPEG on Raspberry Pi"
tags: [raspberry-pi, ffmpeg]
---

> **Note**: This took ~6 hours to compile on a Raspberry Pi B+!

1. Install build dependencies:
   ```bash
   apt-get install build-essential
   ```
2. Build **x264**:
   ```bash
   git clone --depth 1 https://git.videolan.org/git/x264.git
   cd x264
   ./configure --host=arm-unknown-linux-gnueabi --enable-static --disable-opencl
   make -j$(nproc)
   make install
   cd ..
   ```
3. Build **ffmpeg**:
   ```bash
   git clone --depth=1 https://git.videolan.org/git/ffmpeg.git
   cd ffmpeg
   ./configure --arch=armhf --target-os=linux --enable-gpl --enable-libx264 --enable-nonfree
   make -j$(nproc)
   make install
   cd ..
   ```

---
1. [http://hannes.enjoys.it/blog/2016/03/ffmpeg-on-raspbian-raspberry-pi/](http://hannes.enjoys.it/blog/2016/03/ffmpeg-on-raspbian-raspberry-pi/)
