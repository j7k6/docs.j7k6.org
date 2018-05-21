---
layout: post
title: "Use Twitter in Irssi with Bitlbee"
tags: [irssi,twitter,irc,bitlbee]
---

1. Install `irssi` & `bitlbee`:
   ```bash
   apt-get update && apt-get install -y bitlbee irssi
   ```
2. Edit `/etc/bitlbee/bitlbee.conf`:
   ```
   DaemonInterface = 127.0.0.1
   DaemonPort = 6667
   ```
3. Enable & start `bitlbee` service:
   ```bash
   systemctl enable bitlbee
   systemctl start bitlbee
   ```
4. Run `irssi`
5. Add *Bitlbee* server & connect:
   ```
   /server add -auto -network bitlbee 127.0.0.1 6667
   /connect bitlbee
   ```
6. Register *Bitlbee* user:
   ```
   register <$BITLBEE_PASSWORD>
   ```
7. Add Twitter account:
   ```
   account add twitter <$TWITTER_HANDLE>
   ```
8. Authorize Twitter account:
   ```
   account on
   ```
   > This will open a new chat window with a Twitter OAUTH2 link in it. Open the link in a browser and authorize *Bitlbee* on Twitter, then copy the displayed auth code back to the chat window.
9. Disable tweeting from *Irssi* (optional):
   ```
   account twitter set commands strict
   ```
10. To connect & identify to the *Bitlbee* server automatically on every start of *Irssi*, run:
    ``` 
    /network add -autosendcmd "/msg &bitlbee identify <$BITLBEE_PASSWORD>; wait -bitlbee 2000; /window goto &bitlbee; /window close" bitlbee
    ```
11. Save *Irssi* configuration:
    ```
    /save
    ```

---
1. [https://wiki.bitlbee.org/HowtoTwitter](https://wiki.bitlbee.org/HowtoTwitter)
2. [https://mantlepro.github.io/posts/chat.html](https://mantlepro.github.io/posts/chat.html)
