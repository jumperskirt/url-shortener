var express = require('express');
var app = express();

var morgan = require('morgan');
var bodyParser = require('body-parser');

var path = require('path');
module.exports = app;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./routes/urls'));

app.get('/', function (req, res) {
   res.render('index');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
});
