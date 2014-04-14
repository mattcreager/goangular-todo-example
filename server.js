var express = require('express');

var path = require('path');
var http = require('http');

var CONNECT_URL = 'YOUR_CONNECT_URL';

var app = express();

app.configure(function() {
  app.set('env', process.env.NODE_ENV || 'local');
  app.set('port', process.env.PORT || 5000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'static')));
});

app.all('*', function(req, res) {
  res.render('index.ejs', {
    connectUrl: process.env.GOINSTANT_CONNECT_URL || CONNECT_URL
  });
});

var port = app.get('port');
console.log('Demo listening on ' + port);
app.listen(port);
