---
layout: post
title: "Obtain Flickr API Token for Authorized Read Access with Node.js"
---

```
// required modules, install with npm
var https = require('https');
var crypto = require('crypto');
var sleep = require('sleep');

// api key & secret
var apiKey = '<$API_KEY>';
var secret = '<$API_SECRET>';

// get frob
var frobApiSig = secret+'api_key'+apiKey+'formatjsonmethodflickr.auth.getFrobnojsoncallback1';
var frobApiSigHash = crypto.createHash('md5').update(frobApiSig).digest('hex');
var frobApiUrl = 'https://api.flickr.com/services/rest/?method=flickr.auth.getFrob&api_key='+apiKey+'&format=json&nojsoncallback=1&api_sig='+frobApiSigHash;

https.get(frobApiUrl, function(res) {
  res.on('data', function(data) {
    var apiFrob = JSON.parse(data).frob._content;
    
    // generate auth url
    var authApiSig = secret+'api_key'+apiKey+'frob'+apiFrob+'permsread';
    var authApiSigHash = crypto.createHash('md5').update(authApiSig).digest('hex');
    var authApiUrl = 'https://flickr.com/services/auth/?api_key='+apiKey+'&perms=read&frob='+apiFrob+'&api_sig='+authApiSigHash;
    
    // open url in browser and authorize in less then 30 seconds
    console.log('Auth URL: '+authApiUrl);
    
    // ...
    sleep.sleep(30);

    // obtain api token
    var tokenApiSig = secret+'api_key'+apiKey+'formatjsonfrob'+apiFrob+'methodflickr.auth.getTokennojsoncallback1';
    var tokenApiSigHash = crypto.createHash('md5').update(tokenApiSig).digest('hex');
    var tokenApiUrl = 'https://api.flickr.com/services/rest/?api_key='+apiKey+'&method=flickr.auth.getToken&frob='+apiFrob+'&format=json&nojsoncallback=1&api_sig='+tokenApiSigHash;

    https.get(tokenApiUrl, function(res) {
      res.on('data', function(data) {
        var apiToken = JSON.parse(data).auth.token._content;
        console.log('Token: '+apiToken);
      });
    });
  });
});
```

---
