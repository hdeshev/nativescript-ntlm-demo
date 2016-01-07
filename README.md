# NTLM Authentication for XMLHttpRequest

This is a demo project that uses a patched version of [ntlm.js](https://github.com/erlandranvinge/ntlm.js) to wrap the NativeScript XMLHttpRequest implementation and provide NTLM authentication.

## Usage

Imports:

```
require('./ntlm');
```

Set your credentials first:

```
Ntlm.setCredentials('DOMAIN', 'USER', '<PASSWORD>');
```

Authenticate and issue "regular" authenticated requests when done:

```
Ntlm.authenticate(url, function(){
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.addEventListener('load', function() {
        resultsBox.text = req.status + ' ' + req.statusText + '\n';
        resultsBox.text += req.responseText;
    });
    req.addEventListener('error', function(e) {
        resultsBox.text = e.toString();
    });
    req.send();
})
```

Note that requests issued after the `Ntlm.authenticate` success callback fires, will be authenticated, and you don't need to change your code.

## Extras

- base64.js is an `atob`/`btoa` polyfill that simulates the browser Base64 APIs. Needed by `ntlm.js`
- `server.js` is a test web app that requires NTLM auth and forwards authentication requests to a domain controller.
