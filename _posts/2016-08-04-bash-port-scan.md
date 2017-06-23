---
layout: post
title: "Port Scan with Bash"
tags: [network, bash]
---

```bash
PORT=1
END_PORT=1024
TARGET="localhost"

while [[ $PORT -lt $END_PORT ]]; do 
  echo  2> /dev/null > /dev/tcp/$TARGET/$PORT
  [ $? == 0 ] && echo "$PORT/tcp is open"
  PORT=$(( $PORT + 1 ))
done
```

---
[https://securityreliks.wordpress.com/2010/08/20/devtcp-as-a-weapon/](https://securityreliks.wordpress.com/2010/08/20/devtcp-as-a-weapon/)
