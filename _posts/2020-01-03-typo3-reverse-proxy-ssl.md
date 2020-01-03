---
layout: post
title: "Typo3 behind SSL Reverse Proxy"
---


Edit `AdditionalConfiguration.php`:

```php
$GLOBALS['TYPO3_CONF_VARS']['SYS']['reverseProxySSL'] = '*';
$GLOBALS['TYPO3_CONF_VARS']['SYS']['reverseProxyIP'] = '*';
$GLOBALS['TYPO3_CONF_VARS']['SYS']['trustedHostsPattern'] = '<$DOMAIN>';
$GLOBALS['TYPO3_CONF_VARS']['SYS']['reverseProxyHeaderMultiValue'] = 'first';
```

---
1. <https://kronova.net/tutorials/typo3/general/typo3-and-reverse-proxy.html>
