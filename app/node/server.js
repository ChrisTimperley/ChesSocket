// Initialisation.
var express = require('express')
  , http = require('http')
  , app = express()
  , server = http.createServer(app)
  , redis = require('redis')
  , io = require('socket.io').listen(app);

// Routes.
app.get('/', function(req, res) {
  res.send('Hello world!');
});

server.listen(8124);

console.log('Server running.');