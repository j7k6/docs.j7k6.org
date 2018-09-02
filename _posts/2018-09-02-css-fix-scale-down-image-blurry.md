---
layout: post
title: "CSS: Reduce Blur on Scaled-Down Images"
tags: [css,fix]
---

```css
body {
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}
```

---
1. <https://css-tricks.com/forums/topic/scaling-down-images-with-css-makes-them-blurry/#post-243683>
