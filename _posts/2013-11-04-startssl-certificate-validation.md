---
layout: post
title: "StartSSL Certificate Validation"
---

[**StartSSL**](https://www.startssl.com) offers free [Class 1](https://en.wikipedia.org/wiki/Public_key_certificate#Vendor_defined_classes) SSL certificate verification, which is accepted by every modern web browser.

## Sign Up
![startssl](/files/startssl-certificate-validation/startssl01.png)
![startssl](/files/startssl-certificate-validation/startssl02.png)
![startssl](/files/startssl-certificate-validation/startssl03.png)

After submitting the registration form, an authentication code will be sent by e-mail:

![startssl](/files/startssl-certificate-validation/startssl04.png)

## Generate Private Key
StartSSL requires a client certificate for login, which will be embedded in the browser. For that reason it has to generate a private key first:
![startssl](/files/startssl-certificate-validation/startssl05.png)

Next, install the certificate in the browser...
![startssl](/files/startssl-certificate-validation/startssl06.png)
![startssl](/files/startssl-certificate-validation/startssl07.png)

...the client certificate authenticates the user at login, so that no username/password combination is needed.
![startssl](/files/startssl-certificate-validation/startssl08.png)

## Backup Client Certificate
![startssl](/files/startssl-certificate-validation/startssl09.png)
![startssl](/files/startssl-certificate-validation/startssl10.png)
![startssl](/files/startssl-certificate-validation/startssl11.png)

## Validation Wizard
**Important**: For verification of a domain name, an existing email account has to exist for that domain (*webmaster@*, *hostmaster@* or *postmaster@*)!
![startssl](/files/startssl-certificate-validation/startssl12.png)
![startssl](/files/startssl-certificate-validation/startssl13.png)
![startssl](/files/startssl-certificate-validation/startssl14.png)
![startssl](/files/startssl-certificate-validation/startssl15.png)
![startssl](/files/startssl-certificate-validation/startssl16.png)

## Certificates Wizard
![startssl](/files/startssl-certificate-validation/startssl17.png)
![startssl](/files/startssl-certificate-validation/startssl18.png)

Generate a SSL key and a CSR as described [*here*](/ssl-certificates) and enter the CSR into the next form:
![startssl](/files/startssl-certificate-validation/startssl19.png)
![startssl](/files/startssl-certificate-validation/startssl20.png)
![startssl](/files/startssl-certificate-validation/startssl21.png)
![startssl](/files/startssl-certificate-validation/startssl22.png)
![startssl](/files/startssl-certificate-validation/startssl23.png)

Now wait for the verification e-mail...

## Save Certificate
![startssl](/files/startssl-certificate-validation/startssl24.png)
![startssl](/files/startssl-certificate-validation/startssl25.png)

Save the certificate on the server (e.g. as *\<DOMAIN\>.crt*).

## Root CA & Class 1 Intermediate Server CA
### Download
```bash
wget http://www.startssl.com/certs/ca.pem
wget http://www.startssl.com/certs/sub.class1.server.ca.pem
```

### Chain the new certificate with the Root CA and Intermediate Server CA files:
```bash
cat <$DOMAIN>.crt sub.class1.server.ca.pem ca.pem > /etc/ssl/certs/<$DOMAIN>.pem
```

---
