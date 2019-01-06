'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @flow weak

module.exports = function () {};

// the loader only use the 
module.exports.pitch = function pitch() {
  var _this = this;

  // Makes the loader asyn.
  var callback = this.async();
  var templatePath = _path2.default.join(__dirname, './worker.js');

  // Make this loader cacheable.
  this.cacheable();
  // Explicit the cache dependency.
  this.addDependency(templatePath);

  _fs2.default.readFile(templatePath, 'utf-8', function (err, template) {
    if (err) {
      callback(err);
      return;
    }

    var source = ('\n      var swPath = \'' + _this.query.slice(1) + '\';\n      ' + template + '\n    ').trim();
    callback(null, source);
  });
};