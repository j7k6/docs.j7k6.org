---
layout: post
title: "Truncate Docker Logs"
tags: [docker]
---

{% raw %}
```bash
for CONTAINER in $(docker ps -q); do
  echo "" > $(docker inspect --format='{{.LogPath}}' $CONTAINER); 
done
```
{% endraw %}

---
