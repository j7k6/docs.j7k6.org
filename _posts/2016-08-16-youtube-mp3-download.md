---
layout: post
title: "Download MP3 from Youtube Video on OS X"
tags: [macos, youtube, mp3]
---

```bash
# install requirements
brew install youtube-dl ffmpeg

# download & convert
youtube-dl "<$YOUTUBE_VIDEO_ID>" --extract-audio --audio-format mp3
```

---
