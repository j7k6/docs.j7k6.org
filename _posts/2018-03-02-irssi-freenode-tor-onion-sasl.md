---
layout: post
title: "Connect irssi to Freenode IRC Onion Address via Tor"
tags: [tor,irssi,irc,sasl]
---

## Prerequirements
To connect to Freenode via Tor, a registerd nickname and SASL authentication is required.

Install the required packages first: `apt-get install -y tor irssi`

### SASL
1. Generate keypair & certificate:
   ```bash
   openssl req -newkey rsa:2048 -days 3650 -x509 -keyout ~/.irssi/<$NICK>.key -out ~/.irssi/<$NICK>.crt -nodes  -subj "/CN=<$NICK>"
   ```
2. Create certificate bundle:
   ```bash
   cat ~/.irssi/<$NICK>.crt ~/.irssi/<$NICK>.key > ~/.irssi/<$NICK>.pem
   ```
3. Get the certificate's fingerprint (will be needed later):
   ```bash
   openssl x509 -in ~/.irssi/<$NICK>.pem -outform der | sha1sum -b | cut -d' ' -f1
   ```

### Nickname Registration
1. Run `irssi`:
   ```bash
   irssi -n <$NICK>
   ```
2. Connect to Freenode:
   ```
   /connect irc.freenode.org 6667
   ```
3. Register Nickname:
   ```
   /msg NickServ REGISTER <$PASSWORD> <$EMAIL>
   ```
4. Add the previously generated certifcate's fingerprint: 
   ```
   /msg NickServ CERT ADD <$CERT_FINGERPRINT>
   ```

Now wait for the email to arrive and confirm the nickname registration.
Enter the command from the confirmation email: 
```
/msg NickServ VERIFY REGISTER <$NICK> <$CONFIRMATION_PASSWORD>
``` 

## Tor
1. Add this line to `/etc/tor/torrc`:
   ```
   mapaddress 10.40.40.40 freenodeok2gncmy.onion
   ```
2. Restart the `tor` service:
   ```
   systemctl restart tor
   ```

## irssi
When the nickname registration was succesful, prepare `irssi` for connecting to Freenode's `freenodeok2gncmy.onion` address.

1. Add the network:
   ```
   /network add -sasl_username <$NICK> -sasl_password <$PASSWORD> -sasl_mechanism EXTERNAL Freenode
   ```
2. Add the server: 
   ```
   /server add -auto -net Freenode -ssl -ssl_cert ~/.irssi/<$NICK>.pem 10.40.40.40 6697
   ```
3. Write config to file:
   ```
   /save
   ```
4. Exit `irssi`:
   ```
   /quit
   ```

Now run `irssi` via Tor:
```bash
torify irssi -n <$NICK>
```

---
1. [https://freenode.net/kb/answer/registration](https://freenode.net/kb/answer/registration)
2. [https://www.funtoo.org/Irssi_over_tor](https://www.funtoo.org/Irssi_over_tor)
