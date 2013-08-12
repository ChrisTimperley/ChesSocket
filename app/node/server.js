var express = require('express');
var app = express.createServer();
var redis = require('redis');
var io = require('socket.io').listen(app);

// Set Express to listen on port 8124.
app.listen(8124);