---
layout: post
title: "Install Certbot on Ubuntu"
tags: [certbot, letsencrypt, ubuntu, linux]
---

```bash
 apt-get update
 apt-get install -y software-properties-common
 add-apt-repository -y ppa:certbot/certbot
 apt-get update
 apt-get install -y python-certbot-nginx
 ```
 
 ---
 1. [https://certbot.eff.org/all-instructions/#ubuntu-17-04-zesty-nginx](https://certbot.eff.org/all-instructions/#ubuntu-17-04-zesty-nginx)
