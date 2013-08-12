var express = require('express')
  , app = express()
  , redis = require('redis')
  , io = require('socket.io').listen(app);

// Set Express to listen on port 8124.
app.listen(8124);