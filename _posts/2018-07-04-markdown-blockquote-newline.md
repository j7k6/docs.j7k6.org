---
layout: post
title: "Markdown: Enable Line Break in Blockquote"
tags: [markdown,fix]
---

By default, Markdown doesn't insert a line break in blockquotes automatically.
The trick is to add **2 spaces** at the end of a line. Like this:

```markdown
> Lorem ipsum dolor sit amet, consetetur sadipscing elitr,<$TWO_SPACES>  
> <$TWO_SPACES>  
> sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
```

The result:
> Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  
>   
> sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.

---
