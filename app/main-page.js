require('./ntlm');
var view = require('ui/core/view');

exports.pageLoaded = function(args) {
    var page = args.object;
}

Ntlm.setCredentials('DOMAIN', 'USER', '<PASSWORD>');

exports.getNtlm = function(args) {
    var resultsBox = view.getViewById(args.object.parent, 'result');

    Ntlm.authenticate('http://10.0.3.2:3000/auth', function(){
        var req = new XMLHttpRequest();
        req.open('GET', 'http://10.0.3.2:3000');
        req.addEventListener('load', function() {
            resultsBox.text = req.status + ' ' + req.statusText + '\n';
            resultsBox.text += req.responseText;
        });
        req.addEventListener('error', function(e) {
            resultsBox.text = e.toString();
        });
        req.send();
    })

}
