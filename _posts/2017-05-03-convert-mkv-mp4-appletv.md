---
layout: post
title: "Convert MKV to MP4 for iTunes & AppleTV"
tags: [ffmpeg, appletv, mkv, mp4]
---

```bash
ffmpeg -i <INPUT_FILE>.mkv -c:v copy -c:a aac -strict experimental <OUTPUT_FILE>.m4v
```

---
1. [https://gist.github.com/pwenzel/d6a0b54b120afac0bd1f](https://gist.github.com/pwenzel/d6a0b54b120afac0bd1f)
