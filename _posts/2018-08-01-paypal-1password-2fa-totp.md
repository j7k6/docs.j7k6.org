---
layout: post
title: "Generate 1Password TOTP Token for PayPal"
tags: [paypal,2fa,security]
---

For some reason *PayPal* doesn't offer "normal" Two Factor Authentication (2FA) usable in **1Password**, instead they require the [*Symantec VIP*](https://idprotect.vip.symantec.com/) app (which is annyoing).
Gladfully [someone reverse-engineered](https://www.cyrozap.com/2014/09/29/reversing-the-symantec-vip-access-provisioning-protocol/) the TOTP process done by the Symantec app and created a nice little [command line tool](https://github.com/cyrozap/python-vipaccess) to generate TOTP tokens usable with **1Passwords** (and other 2FA-capable apps).

> **Note**: The original repository seems to be outdated and doesn't work anymore, but there are plenty of forks to use.


1. Install prerequirements:
   ```bash
   brew install qrencode oath-toolkit
   pip install lxml oath pycryptodome requests
   ```
2. Install `vipaccess`:
   ```bash
   git clone https://github.com/dlenski/python-vipaccess
   cd python-vipaccess
   pip install .
   ```
3. Open the [*PayPal Security Key Page*](https://www.paypal.com/cgi-bin/webscr?cmd=_setup-security-key) and click on "**Activate** Security Key"
   ![paypal-1password-2fa-totp-01.png](/files/paypal-1password-2fa-totp-01.png)
4. Run `vipaccess provision -p`.
   This will generate the following output:

   ```
   Generating request...
   Fetching provisioning response...
   Getting token from response...
   Decrypting token...
   Checking token...
   Credential created successfully:
     otpauth://totp/VIP%20Access:VSST63283447?digits=6&secret=OHRJ4OEQOLY3IVES6FN6OPEN2B2E7PE2&period=30&algorithm=sha1&issuer=Symantec
   This credential expires on this date: 2021-07-31T20:50:02.807Z

   You will need the ID to register this credential: VSST63283447

   You can use oathtool to generate the same OTP codes
   as would be produced by the official VIP Access apps:

     oathtool -d6 -b --totp    OHRJ4OEQOLY3IVES6FN6OPEN2B2E7PE2  # 6-digit code
     oathtool -d6 -b --totp -v OHRJ4OEQOLY3IVES6FN6OPEN2B2E7PE2  # ... with extra information
   ```

   Insert the Credential ID (`VSST...`) into the *Serial number* field (Step 1) on the PayPal site.
   Then generate a token and insert it into Step 2: See `oathtool -d6 -b --totp ...` command above. After ~30 seconds repeat the last command to generate a new token and insert it into the field at Step 3.

   ![paypal-1password-2fa-totp-01.png](/files/paypal-1password-2fa-totp-02.png)
5. Click *Activate*. The security key is now enabled for 2FA.
6. Now generate a TOTP QR-code with the `otpauth://...` URI (see above) and scan it with **1Password** to add it to your PayPal credentials:
   ```bash
   qrencode -t ANSI256 "otpauth://totp/VIP%20Access:VSST63283447?digits=6&secret=OHRJ4OEQOLY3IVES6FN6OPEN2B2E7PE2&period=30&algorithm=sha1&issuer=Symantec"
   ```

---
1. <https://www.cyrozap.com/2014/09/29/reversing-the-symantec-vip-access-provisioning-protocol/>
2. <https://github.com/cyrozap/python-vipaccess>
3. <https://github.com/dlenski/python-vipaccess>
