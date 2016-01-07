var express = require('express'),
    ntlm = require('express-ntlm');

var app = express();

app.use(ntlm({
    debug: function() {
        var args = Array.prototype.slice.apply(arguments);
        console.log.apply(null, args);
    },
    domain: 'MYDOMAIN',
    domaincontroller: 'ldap://mydomain',
}));

app.all('*', function(request, response) {
    response.end(JSON.stringify(request.ntlm)); // {"DomainName":"MYDOMAIN","UserName":"MYUSER","Workstation":"MYWORKSTATION"}
});

app.listen(3000);
