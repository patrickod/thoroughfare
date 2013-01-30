var _ = require('underscore')
var utils = require('./utils');

function Store() {
}

Store.prototype.connect = function(cb) {
  var self = this;
  process.nextTick(function() {
    cb(null, self)
  });

  return this;
}

module.exports = Store;
