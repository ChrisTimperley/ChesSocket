// Setup HTTP server.
var http = require('http');
var env = process.env.NODE_ENV || 'development'
var debug = require('debug')('http');
var config = require('./config/config')[env]

// Setup Express application (using the appropriate config).
var express = require('express');
var app = express();
require('./config/express')(app, config);
require('./config/routes')(app);

// Set the server to listen.
http.createServer(app).listen(app.get('port'), function(){
  debug('Listening on port ' + app.get('port'));
});