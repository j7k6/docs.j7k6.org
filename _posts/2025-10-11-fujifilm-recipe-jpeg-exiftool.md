---
layout: post
title: "Read Fujifilm Recipe From JPEG With exiftool"
---

```bash
exiftool -Model -LensModel -FilmMode -GrainEffectSize -GrainEffectRoughness -ColorChromeEffect -ColorChromeFXBlue -WhiteBalance -WhiteBalanceFineTune -DevelopmentDynamicRange -HighlightTone -ShadowTone -Saturation -Sharpness -NoiseReduction -Clarity -ISO -ExposureCompensation -ImageCount <$JPEG_FILE>
```

---
1. <https://www.fredmiranda.com/forum/topic/1850080/>
