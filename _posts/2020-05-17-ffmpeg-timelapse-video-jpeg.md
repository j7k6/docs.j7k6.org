---
layout: post
title: "Create Timelapse Video from JPEG's with ffmpeg"
---

```bash
ffmpeg -r 24 -pattern_type glob -i '*.jpg' -s hd1080  -c:v h264_videotoolbox -vcodec libx264 -crf 18 -preset slow timelapse.mp4
```

---
1. <https://gist.github.com/alexellis/bbf2bc2a6789480fcd0031f99800df9c>
