---
layout: default
index: 1
---

<h1 class="archive"><a href="/archive/">Archive</a></h1>
<ul class="index">
  {% for post in site.posts %}
  <li{% if post.fav %} class="fav"{% endif %}><a data-date="{{post.date | date_to_string }}" href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
