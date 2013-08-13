/**
 * This file is used to setup Express correctly, according to the
 * environment in use.
 */

var express = require('express');
var pkg = require('../package.json');

module.exports = function (app, config) {

  // Setup static content.
  app.use(express.static(config.root + '/assets'));

  // Views.
  app.set('views', config.root + '/views');
  app.set('view engine', 'jade');

  app.configure(function(){

    // bodyParser must be above methodOverride.
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // Expose package and environment to views.
    app.use(function (req, res, next) {
      res.locals.pkg = pkg;
      res.locals.env = env;
      next();
    });

    // Routes (should come after all other middleware).
    app.use(app.router);

  });

  // Development specific setup.
  app.configure('development', function(){

  });

};