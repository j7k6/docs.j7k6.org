---
layout: post
title: "Download MP3 from Youtube Video on OS X"
---


1. Install requirements:
   ```bash
   brew install youtube-dl ffmpeg
   ```
2. Download & convert video:
   ```bash
   youtube-dl "<$YOUTUBE_VIDEO_ID>" --extract-audio --audio-format mp3
   ```

---
