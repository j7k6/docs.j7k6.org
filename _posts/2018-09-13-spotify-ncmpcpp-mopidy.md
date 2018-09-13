---
layout: post
title: "Listen to Spotify in ncmpcpp with Mopidy"
tags: [ncmpcpp,mopidy,spotify,mpd,debian]
---

1. Add `mopidy` repository:
   ```bash
   curl -fsSL https://apt.mopidy.com/mopidy.gpg | sudo apt-key add -
   curl -fsSL https://apt.mopidy.com/jessie.list > /etc/apt/sources.list.d/mopidy.list
   ```
2. Install:
   ```bash
   apt update
   apt install mopidy mopidy-spotify mopidy-spotify-tunigo
   ```
3. Edit `/etc/mopidy/mopidy.conf` (get Spotify `client_id` and `client_secret` [here](https://www.mopidy.com/authenticate/)):
   ```
   [mpd]
   hostname = 0.0.0.0

   [spotify]
   username = <$SPOTIFY_USERNAME>
   password = <$SPOTIFY_PASSWORD>
   client_id = <$SPOTIFY_CLIENT_ID>
   client_secret = <$SPOTIFY_CLIENT_SECRET>
   bitrate = 320

   [spotify_tunigo]
   enabled = true
   ```
4. Enable & start `mopidy` service
   ```bash
   systemctl enable --now mopidy
   ```
5. Run `ncmpcpp --host=<$MOPIDY_HOST>` (locally or via network)

> In `ncmpcpp` browse Spotify playlist by pressing `2`.  
> Search songs and albums by pressing `3`.

---
