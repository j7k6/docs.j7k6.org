---
layout: post
title: "Automate SSH Password Login in Scripts with Expect"
tags: [ssh, except, password]
---

1. Create `ssh_wrapper.exp`:
   ```bash
   #!/usr/bin/expect -f

   eval spawn [lrange $argv 1 end]
   expect "*?assword:*"
   send [lindex $argv 0]
   send "\r"
   interact
   ```
2. Run `chmod +x ssh_wrapper.exp`
3. Run SSH command with wrapper script:
    - **SSH**:
      ```
      ./ssh_wrapper <$SSH_PASSWORD> ssh -t -o StrictHostKeyChecking=no <$SSH_USER>@<$SSH_HOST> <$COMMAND>
      ```
    - **SCP**:
      ```
      ./ssh_wrapper <$SSH_PASSWORD> scp -r <$LOCAL_DIR>/. <$SSH_USER>@<$SSH_HOST>:<$REMOTE_DIR>/
      ```
  
---
1. [http://stackoverflow.com/a/28293101](http://stackoverflow.com/a/28293101)
