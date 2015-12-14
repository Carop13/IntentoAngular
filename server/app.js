var express = require('express');

var app = express();
var server = require('http').createServer(app);

server.listen(8080, undefined, function () {
    console.log('Express server listening on %d, in %s mode', 8080, app.get('env'));
});

app.use(express.static('../'));
app.set('appPath',  '../');
app.set('renderPath',  '../');