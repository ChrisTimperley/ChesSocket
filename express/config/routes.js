/**
 * This file is used to setup and expose routes to the application.
 */

module.exports = function (app) {

  app.set('view engine', 'jade');

  // Home route.
  app.get('/', function(req, res){
    res.send('Welcome back homey!');
  });

  app.get('/board', function(req, res){
    res.render('./../views/index.jade');
  });

};