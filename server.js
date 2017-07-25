var http = require('http');
var server = http.createServer();
var models = require('./models/url');
var Promise = require('bluebird');

server.on('request', require('./app'));

Promise.all([
        models.Url.sync({force: true}),
    ])
    .then(function () {
        server.listen(3000, function () {
            console.log('Server is listening on port 3000!');
        });
    })
    .catch(console.error);
