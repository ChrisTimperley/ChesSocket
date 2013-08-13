var path = require('path');
var root_path = path.resolve(__dirname + '../..');

module.exports = {
  development: {
    root: root_path
  },
  test: {
    root: root_path
  },
  staging: {
    root: root_path
  },
  production: {
    root: root_path
  }
};