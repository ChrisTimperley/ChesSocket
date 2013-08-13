/**
 * This file is used to setup and expose routes to the application.
 */

module.exports = function (app) {

  // Home route.
  app.get('/', function(req, res){
    res.send('Welcome back home!');
  });

};